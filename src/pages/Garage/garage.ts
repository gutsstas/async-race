import { Control } from './control';
// import { getData } from '../../core/Data/data';
import { addCar } from '../../core/components/addCar';
import { Pagination } from '../../core/components/pagination';
import { IQueryParams } from '../../types/Interfaces';
import { PAGEANDLIMIT } from '../../types/Interfaces';

export class Garage {
  container: HTMLElement | null = null;
  async render() {
    if (this.container) {
      return this.container;
    }
    const container = document.createElement('div');
    container.className = 'main__garage';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'main__garage__info';

    const infoName = document.createElement('div');
    infoName.className = 'main__garage__info__name';
    infoName.innerText = 'Garage';

    const infoAmount = document.createElement('div');
    infoAmount.className = 'main__garage__info__amount';
    // const data = await getData([
    //   { key: '_page', value: '1' },
    //   { key: '_limit', value: '7' },
    // ]);

    // const count = data.count;

    // infoAmount.innerText = `(${count})`;

    const arrayLocal: IQueryParams[] = [
      { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUE },
      { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUE },
    ];

    localStorage.setItem('AsyncRaceKeyAndValue', JSON.stringify(arrayLocal));

    infoContainer.append(infoName, infoAmount);

    const listCar = document.createElement('div');
    listCar.className = 'main__garage__list-car';

    const count = await addCar(listCar);

    infoAmount.innerText = `(${count})`;

    container.append(Control.render(), infoContainer, listCar, Pagination.render());

    this.container = container;
    return container;
  }
}
