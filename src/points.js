import {getRandomIntegerFromInterval, render, Units} from "./constants";
import {getCardData} from "./data";

const pointsRoot = document.querySelector(`.trip-day__items`);

const createPoint = (data) => {
  return `<article class="trip-point">
          <i class="trip-icon">${data.type}</i>
          <h3 class="trip-point__title">${data.text}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${data.time}</span>
            <span class="trip-point__duration"></span>
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

    const getRandomType = (typesObj) => {
      return Object.keys(typesObj)[getRandomIntegerFromInterval(0, Object.keys(typesObj).length - 1)];
    };

    const getPointTime = (date) => {
      return new Date(date).getHours() + Units.startUnit + `:` + new Date(date).getMinutes() + `–` + getRandomIntegerFromInterval(new Date(date).getHours(), Units.hoursInDay - 1) + `:` + getRandomIntegerFromInterval(new Date(date).getMinutes(), Units.minutesInHour);
    };

    return {
      type: data.type[getRandomType(data.type)],
      city: data.cities,
      picture: data.picture,
      offers: data.offers,
      text: data.text,
      date: new Date(data.date),
      time: getPointTime(data.date),
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
