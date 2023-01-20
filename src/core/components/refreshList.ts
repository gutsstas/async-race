import { getWinners } from '../Data/data';
import { PAGEANDLIMIT, IQueryParams } from '../../types/Interfaces';
import { ResultsWinners } from '../../pages/Winners/table';

export async function refreshListWinners() {
  const arrayString = localStorage.getItem('AsyncRaceKeyAndValueWinner');
  let page: string | PAGEANDLIMIT = PAGEANDLIMIT.PAGEVALUEWIN;
  let limit: string | PAGEANDLIMIT = PAGEANDLIMIT.LIMITVALUEWIN;

  if (arrayString !== null) {
    const arrayKeyValue: IQueryParams[] = JSON.parse(arrayString);

    arrayKeyValue.forEach((item) => {
      if (item.key == PAGEANDLIMIT.PAGE) page = item.value;

      if (item.key == PAGEANDLIMIT.LIMIT) limit = item.value;
    });
  }

  const data = await getWinners([
    { key: PAGEANDLIMIT.PAGE, value: page },
    { key: PAGEANDLIMIT.LIMIT, value: limit },
  ]);

  const table = document.querySelectorAll('.main__winners__container')[0];
  const amount = new ResultsWinners(data);
  table.innerHTML = (await amount.render()).outerHTML;
}
