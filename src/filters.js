import {render} from './constants.js';
import {renderPoints} from './points.js';

const FILTERS_NAMES = [`Everything`, `Future`, `Past`];

const filtersRoot = document.querySelector(`.trip-filter`);
const maxCardsAmount = 20;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const createFilter = (name, checked = false, disabled = false) => {
  return `<input 
          type="radio" 
          id="filter-${name.toLowerCase()}" 
          name="filter" 
          value="${name.toLowerCase()}"
          ${ checked ? `checked` : ``} 
          ${ disabled ? `disabled` : ``} 
          >
          <label 
          class="trip-filter__item" 
          for="filter-${name.toLowerCase()}"
          >
          ${name}
          </label>`;
};

export const renderFilters = () => {
  let content = ``;
  FILTERS_NAMES.forEach((name) => {
    content += createFilter(name);
  });

  filtersRoot.addEventListener(`click`, () => {
    renderPoints(getRandomInt(0, maxCardsAmount));
  });

  render(filtersRoot, content);
};
