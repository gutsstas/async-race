import { getWinners } from '../../core/Data/data';
import { PAGEANDLIMIT, SORT } from '../../types/Interfaces';
import { ResultsWinners } from './table';
import { refreshListWinners } from '../../core/components/refreshList';
import { Pagination } from '../../core/components/pagination';

export class Winners {
  container: HTMLElement | null = null;

  async render() {
    if (this.container) {
      const page = this.container.querySelectorAll('.pagination__page')[0].innerHTML;
      refreshListWinners(page);
      const amount = this.container.querySelectorAll('.main__winners__info__amount')[0];
      const data = await getWinners([
        { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
        { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
      ]);
      amount.innerHTML = `(${data.count})`;
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

    infoContainer.append(infoName, infoAmount);

    const dataObj = await getWinners([
      { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
      { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
      { key: SORT.SORT, value: SORT.ACTIVESORT },
      { key: SORT.ORDER, value: SORT.ACTIVEORDER },
    ]);

    infoAmount.innerText = `(${dataObj.count})`;

    const table = new ResultsWinners(dataObj);

    const result = await table.render();

    container.append(infoContainer, Pagination.render(), result);

    this.container = container;

    return container;
  }
}
