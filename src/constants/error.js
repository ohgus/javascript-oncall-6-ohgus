const ERROR = Object.freeze({
  regex: {
    month: /^(1[0-2]|[1-9])$/,
    name: /^[가-힣]+$/,
  },
  nameLength: 5,
  people: {
    max: 35,
    min: 5,
  },
  message: {
    name: {
      kor: "[ERROR] 이름은 한글로만 입력해 주세요.",
      length: "[ERROR] 이름은 1자 이상 5자 이하로 입력해 주세요.",
    },
    people: "[ERROR] 근무자의 수는 최소 5명 최대 35명 입니다.",
    schedule: {
      onceInWhile:
        "[ERROR] 한명의 근무자는 평일, 휴일 스케쥴에 한번씩 포함되어야 합니다. 다시 입력해 주세요.",
      duplicate:
        "[ERROR] 하나의 근무 스케쥴에 중복된 이름은 사용할 수 없습니다. 다시 입력해 주세요.",
    },
    month: {
      wrongMonthNum:
        "[ERROR] 월은 1이상 12이하의 숫자만 입력 가능합니다. 다시 입력 해주세요.",
      wrongDayString: "[ERROR] 요일의 맞지 않습니다. 다시 입력 해주세요.",
    },
  },
});

export default ERROR;
