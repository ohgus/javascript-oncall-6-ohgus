class Schedule {
  #weekday;
  #dayoff;
  #monthSchedule;

  constructor() {
    this.#monthSchedule = [];
  }

  setWeekdayInput(input) {
    const weekday = input.split(",");

    this.#weekday = weekday;
  }

  setDayoffInput(input) {
    const dayoff = input.split(",");

    this.#dayoff = dayoff;
  }
}

export default Schedule;
