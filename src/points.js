import {getRandomIntegerFromInterval, createElement, Units} from "./constants";
import {PointEdit} from "./pointEdit";

const pointsRoot = document.querySelector(`.trip-day__items`);

export class Point {
  constructor(data) {
    this._type = this._getRandomType(data.type);
    this._icon = data.type[this._type];
    this._title = data.text;
    this._time = data.time;
    this._duration = this._countDuration(this._time);
    this._price = data.price;
    this._offers = data.offers;

    this._element = null;
    this._editHandler = null;

    this._pointClickHandler = this._pointClickHandler.bind(this);
  }

  _getRandomType(typesObj) {
    return Object.keys(typesObj)[getRandomIntegerFromInterval(0, Object.keys(typesObj).length - 1)];
  }

  _getDateFromStr(string) {
    return new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
  }

  _countDuration() {
    const firstTime = this._time.split(`–`)[0];
    const secondTime = this._time.split(`–`)[this._time.split(`–`).length - 1];

    let difference = (this._getDateFromStr(secondTime) - this._getDateFromStr(firstTime));
    if (difference < 0) {
      difference += Units.hoursInDay * Units.minutesInHour * Units.secondsInMinute * Units.millisecondsInSecond;
    }

    let hours = Math.floor((difference % 86400000) / 3600000);
    let minutes = Math.round(((difference % 86400000) % 3600000) / 60000);
    let result = hours + `h ` + minutes + `m`;
    return result;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `<article class="trip-point">
          <i class="trip-icon">${this._icon}</i>
          <h3 class="trip-point__title">${this._title}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${this._time}</span>
            <span class="trip-point__duration">${this._duration}</span>
          </p>
          <p class="trip-point__price">${this._price}&euro;</p>
          <ul class="trip-point__offers">
            ${[...this._offers].map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``)}
          </ul>
        </article>`;
  }

  set editHandler(fn) {
    this._editHandler = fn;
  }

  _pointClickHandler() {
    if (typeof this._editHandler === `function`) {
      this._editHandler();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._pointClickHandler);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._pointClickHandler);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}


export const renderPoints = (data) => {
  pointsRoot.innerHTML = ``;
  let fragment = document.createDocumentFragment();
  let i = 0;
  while (i < data.length) {
    let point = new Point(data[i]);
    let pointEdit = new PointEdit(data[i]);
    point.editHandler = () => {
      pointEdit.render();
      pointsRoot.replaceChild(pointEdit.element, point.element);
      point.unrender();
    };

    pointEdit.submitHandler = () => {
      point.render();
      pointsRoot.replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };

    pointEdit.resetHandler = () => {
      pointsRoot.removeChild(pointEdit.element);
      pointEdit.unrender();
    };

    fragment.appendChild(point.render());
    i++;
  }

  pointsRoot.appendChild(fragment);
};
