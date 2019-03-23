import {createElement} from "./constants";

export class Filter {
  constructor(data) {
    this._filters = data;
    this._element = null;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  get template() {
    return `<form class="trip-filter">
          ${ this._filters.map((filter) => `<input type="radio" id="filter-${filter.name.toLowerCase()}" name="filter" value="${filter.name.toLowerCase()}" ${filter.checked ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>`).join(``) }
        </form>`;
  }

  set clickHandler(fn) {
    this._clickHandler = fn;
  }

  _filterClickHandler() {
    if (typeof this._clickHandler === `function`) {
      this._clickHandler();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._filterClickHandler, true);
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
