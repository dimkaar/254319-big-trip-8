import {getRandomIntegerFromInterval, Units} from "./constants";

const textLength = 4;
const citiesAmount = 1;
const weeksAmount = 12;
const minPrice = 20;
const maxPrice = 2500;

const sortAndRandomlySliceArray = (array, maxAmount) => {
  return array.sort(() =>(Math.random() - 0.5)).slice(0, maxAmount);
};

const getRandomOffers = (offersSet, maxAmount) => {
  const offers = [...offersSet];
  return new Set(sortAndRandomlySliceArray(offers, maxAmount));
};

const createRandomText = (sentencesArray, sentencesAmount) => {
  return sortAndRandomlySliceArray(sentencesArray, sentencesAmount).join[` `];
};

const getNearestWeekendRandomDate = () => {
  return Date.now() + Math.floor(getRandomIntegerFromInterval(Units.daysInWeek * weeksAmount + 1)) * Units.hoursInDay * Units.minutesInHour * Units.secondsInMinute * Units.millisecondsInSecond;
};

export const getCardData = () => {
  return {
    type: {
      'Taxi': `🚕`,
      'Bus': `🚌`,
      'Train': `🚂`,
      'Ship': `🛳️`,
      'Transport': `🚊`,
      'Drive': `🚗`,
      'Flight': `✈️`,
      'Check-in': `🏨`,
      'Sightseeing': `🏛️`,
      'Restaurant': `🍴`,
    },
    cities: [`Amsterdam`, `Geneve`, `Chamonix`, `Maskat`, `Rio de Janeiro`, `Kioto`][getRandomIntegerFromInterval(0, citiesAmount)],
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: getRandomOffers(new Set([
      `Add luggage`,
      `Switch to comfort class`,
      `Add meal`,
      `Choose seats`
    ]), 2),
    text: createRandomText([`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`], getRandomIntegerFromInterval(0, textLength)),
    date: getNearestWeekendRandomDate(),
    price: getRandomIntegerFromInterval(minPrice, maxPrice)
  };
};
