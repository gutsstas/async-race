import { getWinners } from '../Data/data';
import { PAGEANDLIMIT, SORT } from '../../types/Interfaces';
import { addItemListWinner } from './itemListWinners';

export async function refreshListWinners(page: string) {
  const data = await getWinners([
    { key: PAGEANDLIMIT.PAGE, value: page },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
    { key: SORT.SORT, value: SORT.ACTIVESORT },
    { key: SORT.ORDER, value: SORT.ACTIVEORDER },
  ]);

  addItemListWinner(data, +page);
}
