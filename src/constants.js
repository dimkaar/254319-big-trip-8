export const Units = {
  millisecondsInSecond: 1000,
  secondsInMinute: 60,
  minutesInHour: 60,
  hoursInDay: 24,
  daysInWeek: 7,
  startUnit: 1,
};

export const getRandomIntegerFromInterval = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
