import HabitItemView from '../view/habit-item-view.js'
import HabitListView from '../view/habit-list-view.js'
import HabitFormView from '../view/habit-form-view.js'
import HabitFilterView from '../view/habit-filter-view.js'
import { render } from '../framework/render.js'
import HabitEditFormView from '../view/habit-edit-form-view.js'

export default class HabitPresenter {
	#habitModel
	#container
	#habitListComponent

	constructor({ container, habitModel: habitModel }) {
		this.#habitModel = habitModel
		this.#container = container
	}

	init() {
		const formComponent = new HabitFormView({
			onSubmit: habit => {
				this.#habitModel.addHabit(habit)
				this.#renderHabits()
			},
		})
		render(formComponent, document.querySelector('.habit-form'))

		const filterComponent = new HabitFilterView({
			onFilterChange: filterData => {
				this.#habitModel.setFilter(filterData)
				this.#renderHabits()
			},
		})
		render(filterComponent, document.querySelector('.habit-filter'))

		this.#habitListComponent = new HabitListView()
		render(this.#habitListComponent, this.#container)

		this.#renderHabits()
	}

	#renderHabits() {
		this.#habitListComponent.listElement.innerHTML = ''

		this.#habitModel.getFilteredHabits().forEach(habit => {
			const habitView = new HabitItemView(habit, {
				onDelete: id => {
					this.#habitModel.deleteHabit(id)
					this.#renderHabits()
				},
				onEdit: () => {
					const editForm = new HabitEditFormView(habit, {
						onSubmit: updatedHabit => {
							this.#habitModel.updateHabit(updatedHabit)
							this.#renderHabits()
						},
					})

					this.#habitListComponent.listElement.replaceChild(
						editForm.element,
						habitView.element
					)
				},
			})

			render(habitView, this.#habitListComponent.listElement)
		})
	}
}
