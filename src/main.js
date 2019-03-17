import {getRandomIntegerFromInterval} from "./constants";
import {FilterInput, FilterLabel} from "./filters";
import {renderPoints} from "./points";
import {dataArray, filtersData, randomizeData} from "./data";

let fragment = document.createDocumentFragment();

const filtersRoot = document.querySelector(`.trip-filter`);

const init = () => {
  let i = 0;
  while (i < filtersData.length) {
    let filterInput = new FilterInput(filtersData[i]);
    let filterLabel = new FilterLabel(filtersData[i]);
    filterLabel.clickHandler = () => {
      renderPoints(randomizeData(getRandomIntegerFromInterval(7, 20)));
    };
    fragment.appendChild(filterInput.render());
    fragment.appendChild(filterLabel.render());
    i++;
  }

  renderPoints(dataArray);
};

init();


filtersRoot.appendChild(fragment);
