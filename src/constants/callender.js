const END_DAY = Object.freeze({
  thirty: [4, 6, 9, 11],
  thirtyOne: [1, 3, 5, 7, 8, 10, 12],
  endThirty: 30,
  endThirtyOne: 31,
  feb: 28,
});

const ALL_DAY = Object.freeze({
  allDays: ["월", "화", "수", "목", "금", "토", "일"],
  weekday: ["월", "화", "수", "목", "금"],
  weekend: ["토", "일"],
  dayLength: 7,
});

const HOLLIDAY = Object.freeze({
  month: [1, 3, 5, 6, 8, 10, 12],
  1: [1],
  3: [1],
  5: [5],
  6: [6],
  8: [15],
  10: [3, 9],
  12: [25],
});

export { END_DAY, ALL_DAY, HOLLIDAY };
