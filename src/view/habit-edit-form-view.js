import { AbstractComponent } from '../framework/abstract-component.js'

export default class HabitEditFormView extends AbstractComponent {
	#habit
	#onSubmit

	constructor(habit, { onSubmit }) {
		super()
		this.#habit = habit
		this.#onSubmit = onSubmit
		this.element.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		const { title, description, status } = this.#habit

		return `
      <form class="habit-edit-form">
        <input type="text" name="name" value="${title}" required />
        <textarea name="description" placeholder="Описание привычки" rows="3">${description}</textarea>
				<label for="habit-status">Статус привычки:</label>
				<select id="habit-status" name="status" required>
							<option value="active" ${status === 'active' ? 'selected' : ''}>Активна</option>
							<option value="completed" ${status === 'completed' ? 'selected' : ''}>Завершена</option>
				</select>
        <button type="submit">Сохранить</button>
      </form>
    `
	}

	#handleSubmit = evt => {
		evt.preventDefault()
		const form = this.element

		const updatedHabit = {
			...this.#habit,
			title: form.name.value.trim(),
			description: form.description.value,
			status: form.status.value,
		}

		this.#onSubmit(updatedHabit)
	}
}
