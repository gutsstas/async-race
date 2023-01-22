import { IWinner } from '../../types/Interfaces';

export class CarWinner {
  id;
  time;
  wins;
  num;
  name;
  color;

  constructor(car: IWinner, num: number, name: string, color: string) {
    this.id = car.id;
    this.time = car.time;
    this.wins = car.wins;
    this.num = num;
    this.name = name;
    this.color = color;
  }

  render() {
    const container = document.createElement('tr');
    container.className = 'result__main__car';

    const number = document.createElement('td');
    number.className = 'result__main__number';
    number.innerText = `${(this.num += 1)}`;

    const carContainer = document.createElement('td');
    carContainer.className = 'result__main__car-container';

    const car = document.createElement('i');
    car.className = 'result__main__car fa-solid fa-truck-monster';
    car.style.color = this.color;

    carContainer.append(car);

    const name = document.createElement('td');
    name.className = 'result__main__name';
    name.innerText = this.name;

    const wins = document.createElement('td');
    wins.className = 'result__main__wins';
    wins.innerText = `${this.wins}`;

    const time = document.createElement('td');
    time.className = 'result__main__time';
    time.innerText = `${this.time}`;

    container.append(number, carContainer, name, wins, time);

    return container;
  }
}
