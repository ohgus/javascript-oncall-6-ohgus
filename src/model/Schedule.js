import { ALL_DAY, HOLLIDAY } from "../constants/callender.js";
import ERROR from "../constants/error.js";

class Schedule {
  #weekday;
  #dayoff;
  #monthSchedule;

  constructor() {
    this.#monthSchedule = [];
  }

  setWeekdayInput(weekday) {
    this.#validateWeekday(weekday);
    this.#weekday = weekday;
  }

  setDayoffInput(dayoff) {
    this.#validateDayoff(this.#weekday, dayoff);
    this.#dayoff = dayoff;
  }

  setMonthSchedule(month, dayList) {
    let weekdayIndex = 0;
    let dayoffIndex = 0;
    let dayIndex = 0;
    const weekdayStack = [];
    const dayoffStack = [];
    const holliday = this.#getkHolliday(month);

    while (this.#monthSchedule.length < dayList.length) {
      // 평일이라면
      if (ALL_DAY.weekday.includes(dayList[dayIndex])) {
        if (holliday.includes(dayIndex + 1)) {
          if (dayoffIndex >= this.#dayoff.length) {
            dayoffIndex = dayoffIndex % this.#dayoff.length;
          }
          if (this.#checkWorkYesterday(this.#dayoff[dayoffIndex])) {
            dayoffStack.push(this.#dayoff[dayoffIndex]);
            this.#monthSchedule.push(this.#dayoff[dayoffIndex + 1]);
            dayoffIndex += 2;
          } else {
            if (dayoffStack.length > 0) {
              this.#monthSchedule.push(this.#dayoff[dayoffIndex]);
              dayoffIndex += 1;
            } else {
              this.#monthSchedule.push(dayoffStack.pop());
            }
          }
        }
        if (weekdayIndex >= this.#weekday.length) {
          weekdayIndex = weekdayIndex % this.#weekday.length;
        }
        if (dayIndex === 0) {
          this.#monthSchedule.push(this.#weekday[weekdayIndex]);
          weekdayIndex += 1;
        } else {
          if (weekdayStack.length === 0) {
            if (this.#checkWorkYesterday(this.#weekday[weekdayIndex])) {
              weekdayStack.push(this.#weekday[weekdayIndex]);
              this.#monthSchedule.push(this.#weekday[weekdayIndex + 1]);
              weekdayIndex += 2;
            }
          } else {
            this.#monthSchedule.push(weekdayStack.pop());
          }
        }
      } else {
        if (dayoffIndex >= this.#dayoff.length) {
          dayoffIndex = dayoffIndex % this.#dayoff.length;
        }
        if (this.#checkWorkYesterday(this.#dayoff[dayoffIndex])) {
          dayoffStack.push(this.#dayoff[dayoffIndex]);
          this.#monthSchedule.push(this.#dayoff[dayoffIndex + 1]);
          dayoffIndex += 2;
        } else {
          if (dayoffStack.length > 0) {
            this.#monthSchedule.push(this.#dayoff[dayoffIndex]);
            dayoffIndex += 1;
          } else {
            this.#monthSchedule.push(dayoffStack.pop());
          }
        }
      }
    }
    console.log(this.#monthSchedule);
  }

  #getkHolliday(month) {
    if (HOLLIDAY.month.includes(month)) {
      return HOLLIDAY[month];
    } else return [];
  }

  #checkWorkYesterday(name) {
    if (this.#monthSchedule[this.#monthSchedule.length - 1] === name) {
      return true;
    }
    return false;
  }

  #validateWeekday(weekday) {
    if (
      weekday.length < ERROR.people.min ||
      weekday.length > ERROR.people.max
    ) {
      throw new Error(ERROR.message.people);
    } else if (weekday.length !== new Set(weekday).size) {
      throw new Error(ERROR.message.schedule.duplicate);
    }
    this.#validateName(weekday);
  }

  #validateDayoff(weekday, dayoff) {
    if (dayoff.length < ERROR.people.min || dayoff.length > ERROR.people.max) {
      throw new Error(ERROR.message.people);
    } else if (dayoff.length !== new Set(dayoff).size) {
      throw new Error(ERROR.message.schedule.duplicate);
    }

    this.#validateName(dayoff);

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
