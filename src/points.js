import {getRandomIntegerFromInterval, render, Units} from "./constants";
import {getCardData} from "./data";

const pointsRoot = document.querySelector(`.trip-day__items`);

const createPoint = (data) => {
  return `<article class="trip-point">
          <i class="trip-icon">${data.type}</i>
          <h3 class="trip-point__title">${data.text}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${data.time}</span>
            <span class="trip-point__duration">${data.duration}</span>
          </p>
          <p class="trip-point__price">${data.price}&euro;</p>
          <ul class="trip-point__offers">
            ${[...data.offers].map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``)}
          </ul>
        </article>`;
};

export const renderPoints = (amount) => {
  let content = ``;
  let i = 0;
  const dataArr = [];
  let tmpData;

  const parseData = (data) => {
    let time;

    const getPointTime = (date) => {
      return new Date(date).getHours() + Units.startUnit + `:` + new Date(date).getMinutes() + `–` + getRandomIntegerFromInterval(0, Units.hoursInDay) + `:` + getRandomIntegerFromInterval(new Date(date).getMinutes(), (Units.minutesInHour - Units.startUnit));
    };

    const replaceText = (str, search, replacement) => {
      return str.split(search).join(replacement);
    };

    time = getPointTime(data.date);

    if (~time.indexOf(`24`)) {
      time = replaceText(time, `24`, `00`);
    }

    const getRandomType = (typesObj) => {
      return Object.keys(typesObj)[getRandomIntegerFromInterval(0, Object.keys(typesObj).length - 1)];
    };

    const getDateFromStr = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);

    const countDuration = () => {
      const firstTime = time.split(`–`)[0];
      const secondTime = time.split(`–`)[time.split(`–`).length - 1];

      let difference = (getDateFromStr(secondTime) - getDateFromStr(firstTime));

      let hours = Math.floor((difference % 86400000) / 3600000);
      let minutes = Math.round(((difference % 86400000) % 3600000) / 60000);
      let result = hours + `h ` + minutes + `m`;
      return result;
    };

    return {
      type: data.type[getRandomType(data.type)],
      city: data.cities,
      picture: data.picture,
      offers: data.offers,
      text: data.text,
      date: new Date(data.date),
      time,
      duration: countDuration(),
      price: data.price
    };
  };

  while (i < amount) {
    tmpData = getCardData();
    dataArr.push(tmpData);
    content += createPoint(parseData(tmpData));
    i++;
  }

  render(pointsRoot, content);
};
