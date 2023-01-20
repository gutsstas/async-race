import { getData, getWinners } from '../Data/data';
import { PAGEANDLIMIT, IQueryParams } from '../../types/Interfaces';
import { refreshListCar } from './addCar';
import { refreshListWinners } from './refreshList';

export async function changePageNumber(e: Event) {
  const target = <Element>e.target;
  const page = <HTMLDivElement>document.querySelectorAll('.pagination__page')[0];
  const currentPage = +page.innerText;

  const data = await getData([
    { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUE },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUE },
  ]);

  const amountPages = data.count / Number(PAGEANDLIMIT.LIMITVALUE);

  if (amountPages <= currentPage && target.classList.contains('pagination__button-next')) return;

  if (currentPage == 1 && target.classList.contains('pagination__button-prev')) return;

  let newPage: number;

  if (target.classList.contains('pagination__button-next')) newPage = currentPage + 1;
  else newPage = currentPage - 1;

  const arrayString = localStorage.getItem('AsyncRaceKeyAndValue');

  if (arrayString !== null) {
    const arrayKeyValue: IQueryParams[] = JSON.parse(arrayString);

    arrayKeyValue.forEach((item) => {
      if (item.key == PAGEANDLIMIT.PAGE) item.value = `${newPage}`;
    });

    page.innerText = `${newPage}`;

    localStorage.setItem('AsyncRaceKeyAndValue', JSON.stringify(arrayKeyValue));
    refreshListCar();
  }
}

export async function changePageNumberWinner(e: Event) {
  const target = <Element>e.target;
  const page = <HTMLDivElement>document.querySelectorAll('.pagination__page')[0];
  const currentPage = +page.innerText;

  const data = await getWinners([
    { key: PAGEANDLIMIT.PAGE, value: PAGEANDLIMIT.PAGEVALUEWIN },
    { key: PAGEANDLIMIT.LIMIT, value: PAGEANDLIMIT.LIMITVALUEWIN },
  ]);

  // eslint-disable-next-line no-console
  console.log(data);
  const amountPages = data.count / Number(PAGEANDLIMIT.LIMITVALUEWIN);

  if (amountPages <= currentPage && target.classList.contains('pagination__button-next')) return;

  if (currentPage == 1 && target.classList.contains('pagination__button-prev')) return;

  let newPage: number;

  if (target.classList.contains('pagination__button-next')) newPage = currentPage + 1;
  else newPage = currentPage - 1;

  const arrayString = localStorage.getItem('AsyncRaceKeyAndValueWinner');

  if (arrayString !== null) {
    const arrayKeyValue: IQueryParams[] = JSON.parse(arrayString);

    arrayKeyValue.forEach((item) => {
      if (item.key == PAGEANDLIMIT.PAGE) item.value = `${newPage}`;
    });

    page.innerText = `${newPage}`;

    localStorage.setItem('AsyncRaceKeyAndValueWinner', JSON.stringify(arrayKeyValue));
    refreshListWinners();
  }
}
