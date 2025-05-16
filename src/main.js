import HabitPresenter from './presenter/habit-presenter.js'
import HabitModel from './model/habit-model.js'

const appContainer = document.querySelector('.habit-list')
const habitModel = new HabitModel()

const presenter = new HabitPresenter({
	container: appContainer,
	habitModel,
})

presenter.init()
