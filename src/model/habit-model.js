import {habits as mockHabits} from '../mock/habits.js'

export default class HabitModel {
  #habits = [...mockHabits]
  #filter = {date: '', completedOnly: false}

  get habits() {
    return this.#habits
  }

  setFilter({date, status}) {
    this.#filter = {date, status}
  }

  getFilteredHabits() {
    return this.#habits.filter(habit => {
      const matchDate = this.#filter.date
          ? habit.date === this.#filter.date
          : true

      const matchStatus = this.#filter.status === habit.status
          || this.#filter.status === 'all' || this.#filter.status === undefined

      return matchDate && matchStatus
    })
  }

  addHabit(habit) {
    this.#habits.push(habit)
  }

  deleteHabit(id) {
    this.#habits = this.#habits.filter(habit => habit.id !== id)
  }

  updateHabit(updatedHabit) {
    this.#habits = this.#habits.map(habit =>
        habit.id === updatedHabit.id ? updatedHabit : habit
    )
  }
}
