import { changePageGarage, changePageWinner } from './page';
import { path } from '../Data/data';

export class Pagination {
  static render() {
    const container = document.createElement('div');
    container.className = 'main__garage__pagination';

    const prev = document.createElement('button');
    prev.className = 'pagination__button-prev';
    prev.innerText = 'Prev';

    prev.addEventListener('click', async (e) => {
      checkPage(e);
    });

    const pageName = document.createElement('div');
    pageName.className = 'pagination__page-name';
    pageName.innerText = 'Page: ';

    const page = document.createElement('div');
    page.className = 'pagination__page';
    page.innerText = '1';

    const next = document.createElement('button');
    next.className = 'pagination__button-next';
    next.innerText = 'Next';

    next.addEventListener('click', async (e) => {
      checkPage(e);
    });

    container.append(prev, pageName, page, next);
    return container;
  }
}

const clearInput = () => {
  const changeBtn = document.querySelectorAll('.control__change__change-button')[0];
  const changeText = <HTMLInputElement>document.querySelectorAll('.control__change__input-text')[0];
  if (!changeBtn.classList.contains('active__change-button')) changeBtn.classList.add('active__change-button');
  changeText.value = '';
  changeText.setAttribute('readonly', '');
};

export const returnStatusButton = () => {
  const race = document.querySelectorAll('.button-container__race')[0];
  const reset = document.querySelectorAll('.button-container__reset')[0];
  const gen = document.querySelectorAll('.button-container__generation')[0];

  if (race.classList.contains('active-control-button')) race.classList.remove('active-control-button');
  if (gen.classList.contains('active-control-button')) gen.classList.remove('active-control-button');
  if (!reset.classList.contains('active-control-button')) reset.classList.add('active-control-button');
};

const checkPage = async (e: Event) => {
  const hash = window.location.hash.slice(1);
  if (hash === path.garage) {
    const result = await changePageGarage(e);
    clearInput();
    if (result) returnStatusButton();
  } else {
    await changePageWinner(e);
  }
};
