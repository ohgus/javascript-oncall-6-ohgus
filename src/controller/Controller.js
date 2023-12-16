import Callender from "../model/Callender.js";
import Schedule from "../model/Schedule.js";

class Controller {
  #callenderInfo;
  #scheduleInfo;

  constructor() {
    this.#callenderInfo = new Callender();
    this.#scheduleInfo = new Schedule();
  }

  async start() {}
}

export default Controller;
