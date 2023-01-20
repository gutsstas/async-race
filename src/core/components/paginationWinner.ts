import { changePageNumberWinner } from './page';

export class PaginationWinners {
  static render() {
    const container = document.createElement('div');
    container.className = 'main__winners__pagination';

    const prev = document.createElement('button');
    prev.className = 'pagination__button-prev';
    prev.innerText = 'Prev';

    prev.addEventListener('click', async (e) => {
      await changePageNumberWinner(e);
    });

    const page = document.createElement('div');
    page.className = 'pagination__page';
    page.innerText = '1';

    const next = document.createElement('button');
    next.className = 'pagination__button-next';
    next.innerText = 'Next';

    next.addEventListener('click', async (e) => {
      await changePageNumberWinner(e);
    });

    container.append(prev, page, next);
    return container;
  }
}
