import { END_DAY } from "../constants/callender.js";

class Callender {
  #month;
  #endDay;
  #dayList;

  constructor() {
    this.#dayList = [];
  }

  setDateInput(input) {
    const [month, day] = input.split(",");
    this.#setEndDay(Number(month));
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
}

export default Callender;
