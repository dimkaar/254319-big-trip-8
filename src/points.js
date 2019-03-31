import {TYPES, Units} from "./constants";
import {Component} from "./component";

export class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._icon = TYPES[this._type];
    this._title = data.text;
    this._time = data.time;
    this._duration = this._countDuration(this._time);
    this._price = data.price;
    this._offers = data.offers;
    this._chosenOffers = [...data.chosenOffers];

    this._editHandler = null;

    this._pointClickHandler = this._pointClickHandler.bind(this);
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
            ${ this._chosenOffers.map((offer) => `<li><button class="trip-point__offer">${offer} +&euro;&nbsp;${ this._offers[offer]}</button></li>`).join(``) }
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
}
