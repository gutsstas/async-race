import { IWinner, ICar } from '../../types/Interfaces';
import { CarWinner } from '../../core/components/carWinner';
import { getData } from '../../core/Data/data';

export class ResultsWinners {
  dataObj;

  constructor(dataObj: { data: IWinner[]; count: number }) {
    this.dataObj = dataObj;
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
    wins.innerText = 'Wins';

    const time = document.createElement('th');
    time.className = 'result__header__time';
    time.innerText = 'Best time(seconds)';

    header.append(number, car, name, wins, time);

    const arrayCar = (await getData([])).data;

    this.dataObj.data.forEach(async (item: IWinner, index: number) => {
      const findCar = arrayCar.find((i: ICar) => i.id == item.id);

      const car = new CarWinner(item, index, findCar.name, findCar.color);

      tbody.append(car.render());
    });

    return container;
  }
}
