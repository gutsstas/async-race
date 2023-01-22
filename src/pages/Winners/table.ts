import { IWinner, SORT } from '../../types/Interfaces';
import { sortByWinsOrTime } from '../../core/components/sorting';
import { addItemListWinner } from '../../core/components/itemListWinners';

export class ResultsWinners {
  dataObj;
  page;

  constructor(dataObj: { data: IWinner[]; count: number }, page?: number) {
    this.dataObj = dataObj;
    this.page = page;
  }

  async render() {
    const container = document.createElement('table');
    container.className = 'main__winners__container';

    const thead = document.createElement('thead');
    thead.className = 'main__winners__head';

    const tbody = document.createElement('tbody');
    tbody.className = 'main__winners__body';

    container.append(thead, tbody);

    const header = document.createElement('tr');
    header.className = 'result__header';

    thead.append(header);

    const number = document.createElement('th');
    number.className = 'result__header__number';
    number.innerText = 'Number';

    const car = document.createElement('th');
    car.className = 'result__header__car';
    car.innerText = 'Car';

    const name = document.createElement('th');
    name.className = 'result__header__name';
    name.innerText = 'Name';

    const wins = document.createElement('th');
    wins.className = 'result__header__wins';

    const winsName = document.createElement('span');
    winsName.className = 'result__header__wins__name';
    winsName.innerText = 'Wins';

    const winsUP = document.createElement('i');
    winsUP.className = 'result__header__wins__UP fa-solid fa-chevron-up table__UP-active';

    wins.append(winsName, winsUP);

    wins.addEventListener('click', async () => {
      sortByWinsOrTime(winsUP, timeUP, SORT.WINS);
    });

    const time = document.createElement('th');
    time.className = 'result__header__time';

    const timeName = document.createElement('span');
    timeName.className = 'result__header__time__name';
    timeName.innerText = 'Best time(seconds)';

    const timeUP = document.createElement('i');
    timeUP.className = 'result__header__time__UP fa-solid fa-chevron-up table__UP-active';

    time.append(timeName, timeUP);

    time.addEventListener('click', async () => {
      sortByWinsOrTime(timeUP, winsUP, SORT.TIME);
    });

    header.append(number, car, name, wins, time);

    await addItemListWinner(this.dataObj, this.page, tbody);

    return container;
  }
}
