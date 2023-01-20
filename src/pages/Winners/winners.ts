import { getWinners } from '../../core/Data/data';
import { IQueryParams, PAGEANDLIMIT } from '../../types/Interfaces';
import { ResultsWinners } from './table';
import { PaginationWinners } from '../../core/components/paginationWinner';

export class Winners {
  container: HTMLElement | null = null;

  async render() {
    if (this.container) {
      return this.container;
    }
    const container = document.createElement('div');
    container.className = 'main__winners';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'main__winners__info';

    const infoName = document.createElement('div');
    infoName.className = 'main__winners__info__name';
    infoName.innerText = 'Winners';

    const infoAmount = document.createElement('div');
    infoAmount.className = 'main__winners__info__amount';

    const arrayLocal: IQueryParams[] = [
      { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
      { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
    ];

    localStorage.setItem('AsyncRaceKeyAndValueWinner', JSON.stringify(arrayLocal));

    infoContainer.append(infoName, infoAmount);

    const dataObj = await getWinners([
      { key: '_page', value: '1' },
      { key: '_limit', value: '3' },
    ]);

    infoAmount.innerText = `(${dataObj.count})`;

    const table = new ResultsWinners(dataObj);

    const result = await table.render();

    //sadasdasdasdadsas
    const changeBtn = document.createElement('button');
    changeBtn.className = 'control__change__change-button';
    changeBtn.innerText = 'Change';

    changeBtn.addEventListener('click', async () => {
      const list = await getWinners([
        { key: '_page', value: '1' },
        { key: '_limit', value: '10' },
      ]);
      // eslint-disable-next-line no-console
      console.log(list);
    });
    container.append(infoContainer, result, PaginationWinners.render());

    this.container = container;

    return container;
  }
}
