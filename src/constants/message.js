const MESSAGE = Object.freeze({
  read: {
    date: "비상 근무를 배정할 월과 시작 요일을 입력하세요> ",
    weekday: "평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
    dayoff: "휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
  },
  print: {
    holidayInWeekday: (month, date, dayList, monthSchedule) =>
      `${month}월 ${date + 1}일 ${dayList[date]}(휴일) ${monthSchedule[date]}`,
    weekdayOrWeekend: (month, date, dayList, monthSchedule) =>
      `${month}월 ${date + 1}일 ${dayList[date]} ${monthSchedule[date]}`,
  },
});

export default MESSAGE;
