import {AbstractComponent} from '../framework/abstract-component.js'

export default class HabitFilterView extends AbstractComponent {
  #onFilterChange

  constructor({onFilterChange}) {
    super()
    this.#onFilterChange = onFilterChange

    this.element
    .querySelector('#status-filter')
    .addEventListener('change', this.#handleFilterChange)
  }

  get template() {
    return `
            <div class="habit-filter">
                <label for="status-filter">Фильтр по статусу:</label>
                <select id="status-filter" name="status">
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="completed">Завершенные</option>
                </select>
            </div>
        `
  }

  #handleFilterChange = () => {
    const status =
        this.element.querySelector('#status-filter').value

    this.#onFilterChange({
      status: status,
    })
  }
}
