import { Console } from "@woowacourse/mission-utils";
import { HOLLIDAY } from "../constants/callender.js";
import MESSAGE from "../constants/message.js";

const OutputView = {
  printError(error) {
    Console.print(error);
  },

  printResult(month, dayList, monthSchedule) {
    let date = 0;
    Console.print("");

    while (date < dayList.length) {
      if (
        HOLLIDAY.month.includes(month) &&
        HOLLIDAY[month].includes(date + 1)
      ) {
        Console.print(
          MESSAGE.print.holidayInWeekday(month, date, dayList, monthSchedule)
        );
        date += 1;
      } else {
        Console.print(
          MESSAGE.print.weekdayOrWeekend(month, date, dayList, monthSchedule)
        );
        date += 1;
      }
    }
  },
};

export default OutputView;
