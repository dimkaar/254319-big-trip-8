import {render} from './constants';

const pointsRoot = document.querySelector(`.trip-day__items`);

const createPoint = (icon, title, time, duration, price, offers) => {
  let offersList = ``;
  if (offers) {
    offers.forEach((offer) => {
      offersList += `<li><button class="trip-point__offer">` + offer + `</button></li>`;
    });
  }
  return `<article class="trip-point">
          <i class="trip-icon">${icon}</i>
          <h3 class="trip-point__title">{$title}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${time}</span>
            <span class="trip-point__duration">${duration}</span>
          </p>
          <p class="trip-point__price">${price}</p>
          <ul class="trip-point__offers">
            ${offers.length > 0 ? offersList : ``}
          </ul>
        </article>`;
};

const renderPoints = (amount) => {
  let content = ``;
  let i = 0;

  while (i < amount) {
    content += createPoint(`🚕`, `title`, `10:00 - 12:30`, `123`, `20$`, [`sfgfsdg`, `fgsdhghfhd`, `fgssdfgsdf`]);
    i++;
  }

  render(pointsRoot, content);
};

export default renderPoints;
