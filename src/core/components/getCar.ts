import { IQueryParams, PAGEANDLIMIT, IWinner } from '../../types/Interfaces';
import { getData, startCar, sendWinner } from '../Data/data';

export const getCarList = async () => {
  const arrayString = localStorage.getItem('AsyncRaceKeyAndValue');
  let page: string | PAGEANDLIMIT = PAGEANDLIMIT.PAGEVALUE;
  let limit: string | PAGEANDLIMIT = PAGEANDLIMIT.LIMITVALUE;

  if (arrayString !== null) {
    const arrayKeyValue: IQueryParams[] = JSON.parse(arrayString);

    arrayKeyValue.forEach((item) => {
      if (item.key == PAGEANDLIMIT.PAGE) page = item.value;

      if (item.key == PAGEANDLIMIT.LIMIT) limit = item.value;
    });
  }

  const data = await getData([
    { key: PAGEANDLIMIT.PAGE, value: page },
    { key: PAGEANDLIMIT.LIMIT, value: limit },
  ]);

  return data;
};

export const setStartedCar = async (id: number) => {
  const time = await startCar([
    { key: 'id', value: `${id}` },
    { key: 'status', value: 'started' },
  ]);

  return time;
};

export const driveCar = async (id: number, time: number, timerID?: NodeJS.Timer) => {
  let timer = timerID;

  if (timer === undefined) {
    timer = setInterval(function () {
      draw(svg, widthBlock, time);
    }, 20);
  }
  const car = <HTMLElement>document.getElementsByClassName(`main__garage__car ${id}`)[0];
  const carBlock = <HTMLElement>car.querySelectorAll('.car__animation__car-block')[0];
  const svg = <HTMLElement>car.querySelectorAll('.fa-solid.fa-truck-monster')[0];

  const widthBlock = carBlock.offsetWidth - svg.offsetWidth * 1.5;

  const result = await startCar([
    { key: 'id', value: `${id}` },
    { key: 'status', value: 'drive' },
  ]);

  if (!result) clearInterval(timer);

  return { timer, result };
};

export function draw(svg: HTMLElement, widthBlock: number, time: number) {
  +svg.style.left.replace(/[^+\d+\.]/g, '') >= widthBlock
    ? widthBlock + 'px'
    : (svg.style.left = +svg.style.left.replace(/[^+\d+\.]/g, '') + (widthBlock / time / 1000) * 20 + 'px');
}

export const createWinner = async (car: IWinner) => {
  await sendWinner(car);
};
