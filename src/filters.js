import {createElement} from "./constants";

export class FilterInput {
  constructor(data) {
    this._name = data.name;
    this._checked = this._getRandomInt(0, 2);
    this._disabled = this._getRandomInt(0, 0);

    this._element = null;
  }

  get template() {
    return `<input 
          type="radio" 
          id="filter-${this._name.toLowerCase()}" 
          name="filter" 
          value="${this._name.toLowerCase()}"
          ${ this._checked ? `checked` : ``} 
          ${ this._disabled ? `disabled` : ``} 
          >`;
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  unrender() {
    this._element = null;
  }
}

export class FilterLabel {
  constructor(data) {
    this._name = data.name;
    this._checked = this._getRandomInt(0, 1);
    this._disabled = this._getRandomInt(0, 1);

    this._element = null;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  get template() {
    return `<label 
          class="trip-filter__item" 
          for="filter-${this._name.toLowerCase()}"
          >
          ${this._name}
          </label>`;
  }

  set clickHandler(fn) {
    this._clickHandler = fn;
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  _filterClickHandler() {
    if (typeof this._clickHandler === `function`) {
      this._clickHandler();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._filterClickHandler);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._filterClickHandler);
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
