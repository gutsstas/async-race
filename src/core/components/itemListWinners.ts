import { ICar, PAGEANDLIMIT, IWinner } from '../../types/Interfaces';
import { getData } from '../Data/data';
import { CarWinner } from './carWinner';

export const addItemListWinner = async (dataObj: { data: IWinner[]; count: number }, page?: number, body?: Element) => {
  const arrayCar = (await getData([])).data;

  let tbody = body;

  if (tbody === undefined) tbody = document.querySelectorAll('.main__winners__body')[0];

  tbody.innerHTML = '';

  dataObj.data.forEach((item: IWinner, index: number) => {
    const findCar = arrayCar.find((i: ICar) => i.id == item.id);
    let currentPage = page;

    if (currentPage === undefined) currentPage = +PAGEANDLIMIT.PAGEVALUEWIN;

    const i = (currentPage - 1) * Number(PAGEANDLIMIT.LIMITVALUEWIN) + index;
    const car = new CarWinner(item, i, findCar.name, findCar.color);
    if (tbody === undefined) return;
    tbody.append(car.render());
  });
};
