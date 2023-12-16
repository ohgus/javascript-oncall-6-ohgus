import { Console } from "@woowacourse/mission-utils";
import MESSAGE from "../constants/message.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.read.date);

    return input;
  },

  async readWeekday() {
    const input = await Console.readLineAsync(MESSAGE.read.weekday);

    return input.split(",");
  },

  async readDayoff() {
    const input = await Console.readLineAsync(MESSAGE.read.dayoff);

    return input.split(",");
  },
};

export default InputView;
