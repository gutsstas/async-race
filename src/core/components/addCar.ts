import { getData } from '../Data/data';
import { ICar, PAGEANDLIMIT } from '../../types/Interfaces';
import { Car } from './car';
import { ACTIVE } from './car';
import { IQueryParams } from '../../types/Interfaces';

export async function addCar(list: HTMLDivElement | Element) {
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

  list.innerHTML = '';

  data.data.forEach((item: ICar) => {
    const car = new Car(item);
    list.append(car.render());
  });

  return data.count;
}

export async function refreshListCar() {
  const list = document.querySelectorAll('.main__garage__list-car')[0];
  const amount = await addCar(list);
  const current = document.querySelectorAll('.main__garage__info__amount')[0];
  current.innerHTML = `(${amount})`;
}

export async function selectCar() {
  const cars = document.querySelectorAll('.main__garage__car');
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].classList.contains(ACTIVE.ACTIVECLASS)) {
      cars[i].classList.remove(ACTIVE.ACTIVECLASS);
    }
  }
}
