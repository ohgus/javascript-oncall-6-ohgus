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
      if (
        ALL_DAY.weekday.includes(dayList[dayIndex]) &&
        !holliday.includes(dayIndex + 1)
      ) {
        // 평일이라면 => 주말, 공휴일 모두 아닌 경우
        if (this.#monthSchedule.length === 0) {
          // 이번달 스케쥴의 첫번째인 경우
          this.#monthSchedule.push(this.#weekday[weekdayIndex]);
          weekdayIndex = (weekdayIndex + 1) % this.#weekday.length;
          dayIndex += 1;
        } else {
          // 스케쥴 첫번째가 아닌 경우
          if (this.#checkWorkYesterday(this.#weekday[weekdayIndex])) {
            // 전날 근무를 한 경우
            this.#monthSchedule.push(
              this.#weekday[(weekdayIndex + 1) % this.#weekday.length]
            );
            weekdayStack.push(this.#weekday[weekdayIndex]);
            weekdayIndex = (weekdayIndex + 2) % this.#weekday.length;
            dayIndex += 1;
          } else {
            // 전날 근무를 안했을 경우
            if (weekdayStack.length > 0) {
              // 근무 미이행자가 있는 경우
              this.#monthSchedule.push(weekdayStack.shift());
              dayIndex += 1;
            } else {
              // 근무 미이행자가 없는 경우
              this.#monthSchedule.push(this.#weekday[weekdayIndex]);
              weekdayIndex = (weekdayIndex + 1) % this.#weekday.length;
              dayIndex += 1;
            }
          }
        }
      } else if (
        ALL_DAY.weekend.includes(dayList[dayIndex]) ||
        holliday.includes(dayIndex + 1)
      ) {
        // 휴일인 경우 => 공휴일, 주말
        if (this.#monthSchedule.length === 0) {
          // 이번달 스케쥴 첫번째 순서인 경우
          this.#monthSchedule.push(this.#dayoff[dayoffIndex]);
          dayoffIndex = (dayoffIndex + 1) % this.#dayoff.length;
          dayIndex += 1;
        } else {
          // 이번달 스케쥴 첫번째 순서가 아닌 경우
          if (this.#checkWorkYesterday(this.#dayoff[dayoffIndex])) {
            // 전날 근무를 했을 경우
            this.#monthSchedule.push(
              this.#dayoff[(dayoffIndex + 1) % this.#dayoff.length]
            );
            dayoffStack.push(this.#dayoff[dayoffIndex]);
            dayoffIndex = (dayoffIndex + 2) % this.#dayoff.length;
            dayIndex += 1;
          } else {
            // 전날 근무를 안했을 경우
            if (dayoffStack.length > 0) {
              // 근무 미이행자가 있는 경우
              this.#monthSchedule.push(dayoffStack.shift());
              dayIndex += 1;
            } else {
              // 근무 미이행자가 없는 경우
              this.#monthSchedule.push(this.#dayoff[dayoffIndex]);
              dayoffIndex = (dayoffIndex + 1) % this.#dayoff.length;
              dayIndex += 1;
            }
          }
        }
      }
    }
  }

  getSchedule() {
    return this.#monthSchedule;
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
