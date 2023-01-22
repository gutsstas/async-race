import { getData, getWinners } from '../Data/data';
import { PAGEANDLIMIT, ICar, IWinner } from '../../types/Interfaces';
import { refreshListCar } from './addCar';
import { refreshListWinners } from './refreshList';

export async function changePageGarage(e: Event) {
  const data = await getData([
    { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUE },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUE },
  ]);

  const page = changePageNumber(e, data, PAGEANDLIMIT.LIMITVALUE);

  if (page) refreshListCar();
  return page;
}

export async function changePageWinner(e: Event) {
  const data = await getWinners([
    { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
  ]);

  const page = changePageNumber(e, data, PAGEANDLIMIT.LIMITVALUEWIN);

  if (page) refreshListWinners(`${page}`);
}

function changePageNumber(e: Event, data: { data: ICar | IWinner; count: number }, limit: string) {
  const target = <Element>e.target;
  const page = <HTMLDivElement>document.querySelectorAll('.pagination__page')[0];
  const currentPage = +page.innerText;

  const amountPages = data.count / Number(limit);

  if (amountPages <= currentPage && target.classList.contains('pagination__button-next')) return false;

  if (currentPage == 1 && target.classList.contains('pagination__button-prev')) return false;

  let newPage: number;

  if (target.classList.contains('pagination__button-next')) newPage = currentPage + 1;
  else newPage = currentPage - 1;

  page.innerText = `${newPage}`;

  return newPage;
}
