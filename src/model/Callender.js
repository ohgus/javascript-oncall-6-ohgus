import ERROR from "../constants/error.js";
import { END_DAY, ALL_DAY } from "../constants/callender.js";

class Callender {
  #month;
  #endDay;
  #dayList;

  constructor() {
    this.#dayList = [];
  }

  setDateInput(input) {
    const [month, day] = input.split(",");
    this.#validate(month, day);
    this.#setEndDay(Number(month));
    this.#setDayList(day);
    this.#month = Number(month);
  }

  #setEndDay(month) {
    if (END_DAY.thirty.includes(month)) {
      this.#endDay = 30;
    } else if (END_DAY.thirtyOne.includes(month)) {
      this.#endDay = 31;
    } else {
      this.#endDay = 28;
    }
  }

  #setDayList(day) {
    let index = ALL_DAY.allDays.indexOf(day);

    while (this.#dayList.length < this.#endDay) {
      this.#dayList.push(ALL_DAY.allDays[index]);
      if (index === 6) {
        index = 0;
      } else {
        index += 1;
      }
    }
  }

  #validate(month, day) {
    if (!ERROR.regex.month.test(month)) {
      throw new Error(ERROR.message.month.wrongMonthNum);
    } else if (!ALL_DAY.allDays.includes(day)) {
      throw new Error(ERROR.message.month.wrongDayString);
    }
  }

  getMonth() {
    return this.#month;
  }

  getDays() {
    return this.#dayList;
  }

  getEndDay() {
    return this.#endDay;
  }
}

export default Callender;
