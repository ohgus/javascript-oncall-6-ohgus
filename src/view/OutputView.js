import { Console } from "@woowacourse/mission-utils";
import { HOLLIDAY } from "../constants/callender.js";

const OutputView = {
  printError(error) {
    Console.print(error);
  },

  printResult(month, dayList, monthSchedule) {
    let index = 0;

    while (index < dayList.length) {
      if (HOLLIDAY.month.includes(month)) {
        if (HOLLIDAY[month].includes(index + 1)) {
          Console.print(
            `${month}월 ${index + 1}일 ${dayList[index]}(휴일) ${
              monthSchedule[index]
            }`
          );
          index += 1;
        } else {
          Console.print(
            `${month}월 ${index + 1}일 ${dayList[index]} ${
              monthSchedule[index]
            }`
          );
          index += 1;
        }
      } else {
        Console.print(
          `${month}월 ${index + 1}일 ${dayList[index]} ${monthSchedule[index]}`
        );
        index += 1;
      }
    }
  },
};

export default OutputView;
