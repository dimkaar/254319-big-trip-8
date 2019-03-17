import {getRandomIntegerFromInterval, createElement, Units} from "./constants";

export class PointEdit {
  constructor(data) {
    this._type = this._getRandomType(data.type);
    this._icon = data.type[this._type];
    this._title = data.text;
    this._time = data.time;
    this._duration = this._countDuration(data.duration);
    this._city = data.city;
    this._price = data.price;
    this._offers = data.offers;
    this._picture = data.picture;

    this._element = null;
    this._submitHandler = null;
    this._resetHandler = null;

    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
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
    return `<article class="point">
  <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">✈️</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${ this._type === `taxi` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
  
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" ${ this._type === `bus` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
  
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${ this._type === `train` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
  
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${ this._type === `flight` ? `checked` : ``}>
            <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
          </div>

          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${ this._type === `check-in` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
  
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${ this._type === `sight-seeing` ? `checked` : ``}>
                <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
              </div>
            </div>
          </div>
    
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
            <datalist id="destination-select">
              <option value="airport"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="hotel"></option>
            </datalist>
          </div>
    
          <label class="point__time">
            choose time
            <input class="point__input" type="text" value="${this._time}" name="time" placeholder="00:00 — 00:00">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
            ${[...this._offers].map((offer) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${offer.split(` `).join(`-`).toLocaleLowerCase()}" name="offer" value="${offer.split(` `).join(`-`).toLocaleLowerCase()}">
                    <label for="${offer.split(` `).join(`-`).toLocaleLowerCase()}" class="point__offers-label">
                <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">30</span>
            </label>`).join(``)}
        </div>
  
        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._title}</p>
        <div class="point__destination-images">
          <img src="${this._picture}" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`;
  }

  _submitButtonClickHandler(evt) {
    evt.preventDefault();
    if (typeof this._submitHandler === `function`) {
      this._submitHandler();
    }
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    if (typeof this._resetHandler === `function`) {
      this._resetHandler();
    }
  }

  set submitHandler(fn) {
    this._submitHandler = fn;
  }

  set resetHandler(fn) {
    this._resetHandler = fn;
  }

  bind() {
    this._element.querySelector(`form`).addEventListener(`submit`, this._submitButtonClickHandler);
    this._element.querySelector(`.point__button:not(.point__button--save)`).addEventListener(`click`, this._resetButtonClickHandler);
  }

  unbind() {
    this._element.querySelector(`form`).removeEventListener(`submit`, this._submitButtonClickHandler);
    this._element.querySelector(`.point__button:not(.point__button--save)`).removeEventListener(`click`, this._resetButtonClickHandler);
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
