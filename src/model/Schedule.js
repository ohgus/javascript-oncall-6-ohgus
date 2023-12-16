class Schedule {
  #weekday;
  #dayoff;
  #monthSchedule;

  constructor() {
    this.#monthSchedule = [];
  }

  setScheduleInput(input) {
    const [weekday, dayoff] = input;

    this.#weekday = weekday.split(",");
    this.#dayoff = dayoff.split(",");
  }
}

export default Schedule;
