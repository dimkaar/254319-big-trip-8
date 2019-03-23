import {getRandomIntegerFromInterval, Units} from "./constants";
import {Filter} from "./filter";
import {Point} from "./points";
import {dataArray, filtersData, randomizeData} from "./data";
import {PointEdit} from "./pointEdit";

let fragment = document.createDocumentFragment();

const filterRoot = document.querySelector(`.trip-controls__menus`);
const pointsRoot = document.querySelector(`.trip-day__items`);

const renderPoints = (data) => {
  pointsRoot.innerHTML = ``;
  fragment = document.createDocumentFragment();
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

const init = () => {
  let filters = new Filter(filtersData);
  filters.clickHandler = () => {
    renderPoints(randomizeData(getRandomIntegerFromInterval(Units.startUnit, 7)));
  };
  fragment.appendChild(filters.render());
  filterRoot.appendChild(fragment);

  renderPoints(dataArray);
};

init();
