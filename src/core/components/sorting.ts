import { getWinners } from '../Data/data';
import { PAGEANDLIMIT, SORT } from '../../types/Interfaces';
import { refreshListWinners } from './refreshList';

export const sorting = async (paramSort: string, paramOrder: string) => {
  await getWinners([
    { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
    { key: SORT.SORT, value: paramSort },
    { key: SORT.ORDER, value: paramOrder },
  ]);

  SORT.ACTIVESORT = paramSort;
  SORT.ACTIVEORDER = paramOrder;

  const page = document.querySelectorAll('.pagination__page')[0].innerHTML;
  refreshListWinners(page);
};

export const sortByWinsOrTime = async (elem: HTMLElement, elem2: HTMLElement, param: string) => {
  if (elem.classList.contains('table__UP-active')) {
    await sorting(param, SORT.ASC);
    elem.classList.remove('table__UP-active');
    elem2.classList.add('table__UP-active');
  } else {
    if (!elem.classList.contains('table__UP-rotate')) {
      await sorting(param, SORT.DESC);
      elem.classList.add('table__UP-rotate');
    } else {
      await sorting(param, SORT.ASC);
      elem.classList.remove('table__UP-rotate');
    }
  }
};
