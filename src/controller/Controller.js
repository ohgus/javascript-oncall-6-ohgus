import Callender from "../model/Callender.js";
import Schedule from "../model/Schedule.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  #callenderInfo;
  #scheduleInfo;

  constructor() {
    this.#callenderInfo = new Callender();
    this.#scheduleInfo = new Schedule();
  }

  async start() {
    await this.#setCallender();
  }

  async #setCallender() {
    try {
      const input = await InputView.readDate();
      this.#callenderInfo.setDateInput(input);
      await this.#setSchedule();
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#setCallender();
    }
  }

  async #setSchedule() {
    try {
      const weekday = await InputView.readWeekday();
      this.#scheduleInfo.setWeekdayInput(weekday);
      const dayoff = await InputView.readDayoff();
      this.#scheduleInfo.setDayoffInput(dayoff);
      this.#scheduleInfo.setMonthSchedule(
        this.#callenderInfo.getMonth(),
        this.#callenderInfo.getDays()
      );
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#setSchedule();
    }
  }
}

export default Controller;
