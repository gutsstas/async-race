import { Control } from './control';
import { addCarsList } from '../../core/components/addCar';
import { Pagination } from '../../core/components/pagination';

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

    infoContainer.append(infoName, infoAmount);

    const listCar = document.createElement('div');
    listCar.className = 'main__garage__list-car';

    const count = await addCarsList(listCar, 1);

    infoAmount.innerText = `(${count})`;

    container.append(Control.render(), infoContainer, Pagination.render(), listCar);

    this.container = container;
    return container;
  }
}
