import Callender from "../model/Callender.js";
import Schedule from "../model/Schedule.js";
import InputView from "../view/InputView.js";

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
    } catch (error) {
      return await this.#setCallender();
    }
  }
}

export default Controller;
