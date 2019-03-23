export const Units = {
  millisecondsInSecond: 1000,
  secondsInMinute: 60,
  minutesInHour: 60,
  hoursInDay: 24,
  daysInWeek: 7,
  startUnit: 1,
};

export const FILTERS_NAMES = [`Everything`, `Future`, `Past`];

export const TYPES = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛️`,
  'Restaurant': `🍴`,
};

export const OFFERS = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];

export const getRandomIntegerFromInterval = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (root, content) => {
  root.innerHTML = content;
};

export const replaceText = (str, search, replacement) => {
  return str.split(search).join(replacement);
};
