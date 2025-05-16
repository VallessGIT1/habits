import { AbstractComponent } from '../framework/abstract-component.js'

export default class HabitListView extends AbstractComponent {
	get template() {
		return `<ul class="habit-list"></ul>`
	}

	get listElement() {
		return this.element
	}
}
