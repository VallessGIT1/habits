import {AbstractComponent} from '../framework/abstract-component.js'

export default class HabitFormView extends AbstractComponent {
  #onSubmit

  constructor({onSubmit}) {
    super()
    this.#onSubmit = onSubmit

    this.element
    .querySelector('form')
    .addEventListener('submit', this.#handleSubmit)
  }

  get template() {
    return `
      <div class="habit-form">
        <h2>Добавить Привычку</h2>
        <form id="habit-form">
          <label for="habit-name">Название привычки:</label>
          <br>
          <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />
          <br>
          <label for="habit-description">Описание:</label>
          <br>
          <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>
          <br>
          <label for="habit-status">Статус привычки:</label>
          <br>
          <select id="habit-status" required>
              <option value="active">Активна</option>
              <option value="completed">Завершена</option>
          </select>
          <br>
          <button type="submit">Добавить Привычку</button>
        </form>
      </div>
    `
  }

  #handleSubmit = evt => {
    evt.preventDefault()

    const form = this.element.querySelector('form')

    const habit = {
      id: crypto.randomUUID(),
      title: form.querySelector('#habit-name').value.trim(),
      description: form.querySelector('#habit-description').value,
      status: form.querySelector('#habit-status').value,
    }

    this.#onSubmit(habit)
    form.reset()
  }
}
