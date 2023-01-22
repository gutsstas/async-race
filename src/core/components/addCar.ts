import { getData } from '../Data/data';
import { ICar, PAGEANDLIMIT } from '../../types/Interfaces';
import { Car } from './car';
import { ACTIVE } from './car';

export async function addCarsList(list: HTMLDivElement | Element, page: number) {
  const data = await getData([
    { key: PAGEANDLIMIT.PAGE, value: `${page}` },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUE },
  ]);

  list.innerHTML = '';

  data.data.forEach((item: ICar) => {
    const car = new Car(item);
    list.append(car.render());
  });

  return data.count;
}

export async function refreshListCar() {
  const page = +document.querySelectorAll('.pagination__page')[0].innerHTML;
  const list = document.querySelectorAll('.main__garage__list-car')[0];
  const amount = await addCarsList(list, page);
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
