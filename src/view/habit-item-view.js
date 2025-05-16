import { AbstractComponent } from '../framework/abstract-component.js'

export default class HabitItemView extends AbstractComponent {
	#habit
	#onDelete

	constructor(habit, { onDelete, onEdit }) {
		super()
		this.#habit = habit

		this.element
			.querySelector('.habit-delete-button')
			.addEventListener('click', () => onDelete(habit.id))

		this.element
			.querySelector('.habit-edit-button')
			.addEventListener('click', onEdit)
	}

	get template() {
		const { title, description, status } = this.#habit

		return `
            <li class="habit-item">
            <h3>${title}</h3>
            <p>${description}</p>
            <select id="habit-status" name="status" disabled>
							<option value="active" ${status === 'active' ? 'selected' : ''}>Активна</option>
							<option value="completed" ${status === 'completed' ? 'selected' : ''}>Завершена</option>
					</select>
            <button class="habit-edit-button">Редактировать</button>
            <button class="habit-delete-button">Удалить</button>
            </li>
        `
	}

	#handleDelete = () => {
		this.#onDelete(this.#habit.id)
	}
}
