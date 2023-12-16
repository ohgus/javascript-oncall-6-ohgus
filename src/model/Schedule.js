import ERROR from "../constants/error.js";

class Schedule {
  #weekday;
  #dayoff;
  #monthSchedule;

  constructor() {
    this.#monthSchedule = [];
  }

  setScheduleInput(input) {
    const [weekday, dayoff] = input;

    this.#validate(weekday, dayoff);

    this.#weekday = weekday;
    this.#dayoff = dayoff;
  }

  #validate(weekday, dayoff) {
    if (
      weekday.length < ERROR.people.min ||
      weekday.length > ERROR.people.max
    ) {
      throw new Error(ERROR.message.people);
    } else if (
      dayoff.length < ERROR.people.min ||
      dayoff.length > ERROR.people.max
    ) {
      throw new Error(ERROR.message.people);
    } else if (
      weekday.length !== new Set(weekday).size ||
      dayoff.length !== new Set(dayoff).size
    ) {
      throw new Error(ERROR.message.schedule.duplicate);
    }

    weekday.forEach((name) => {
      if (!dayoff.includes(name)) {
        throw new Error(ERROR.message.schedule.onceInWhile);
      }
    });

    dayoff.forEach((name) => {
      if (!weekday.includes(name)) {
        throw new Error(ERROR.message.schedule.onceInWhile);
      }
    });

    this.#validateName(weekday);
    this.#validateName(dayoff);
  }

  #validateName(schedule) {
    schedule.forEach((name) => {
      if (!ERROR.regex.name.test(name)) {
        throw new Error(ERROR.message.name.kor);
      } else if (name.length > ERROR.nameLength || name.length < 1) {
        throw new Error(ERROR.message.name.length);
      }
    });
  }
}

export default Schedule;
