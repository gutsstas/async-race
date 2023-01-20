import { changePageNumber } from './page';

export class Pagination {
  static render() {
    const container = document.createElement('div');
    container.className = 'main__garage__pagination';

    const prev = document.createElement('button');
    prev.className = 'pagination__button-prev';
    prev.innerText = 'Prev';

    prev.addEventListener('click', async (e) => {
      await changePageNumber(e);
    });

    const page = document.createElement('div');
    page.className = 'pagination__page';
    page.innerText = '1';

    const next = document.createElement('button');
    next.className = 'pagination__button-next';
    next.innerText = 'Next';

    next.addEventListener('click', async (e) => {
      await changePageNumber(e);
    });

    container.append(prev, page, next);
    return container;
  }
}
