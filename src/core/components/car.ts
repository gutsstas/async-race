// import { getData } from '../Data/data';
import { ICar } from '../../types/Interfaces';
import { removeCar, startCar } from '../Data/data';
import { refreshListCar, selectCar } from './addCar';
import { setStartedCar, driveCar, draw } from './getCar';

export enum ACTIVE {
  ACTIVECLASS = 'active-main__garage__car',
}

export class Car {
  name;
  color;
  id;

  constructor(car: ICar) {
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;
  }
  render() {
    const container = document.createElement('div');
    container.className = `main__garage__car ${this.id}`;

    const control = document.createElement('div');
    control.className = 'main__garage__car__control';

    const select = document.createElement('button');
    select.className = 'car__control__select';
    select.innerText = 'Select';

    select.addEventListener('click', async () => {
      selectCar();
      container.classList.add(ACTIVE.ACTIVECLASS);
      const text = <HTMLInputElement>document.querySelectorAll('.control__change__input-text')[0];
      text.value = this.name;
      const color = <HTMLInputElement>document.querySelectorAll('.control__change__input-color')[0];
      color.value = this.color;
    });

    const remove = document.createElement('button');
    remove.className = 'car__control__remove';
    remove.innerText = 'Remove';

    remove.addEventListener('click', async () => {
      if (!this.id) return;
      await removeCar(this.id);
      await refreshListCar();
    });

    const name = document.createElement('div');
    name.className = 'car__control__name';
    name.innerText = this.name;

    control.append(select, remove, name);

    const blockAnimation = document.createElement('div');
    blockAnimation.className = 'main__garage__car__animation';

    const buttons = document.createElement('div');
    buttons.className = 'car__animation__button-block';

    const start = document.createElement('div');
    start.className = 'car__animation__button-block__start';
    start.innerText = 'A';

    const svg = document.createElement('i');
    svg.className = 'car__animation fa-solid fa-truck-monster';
    svg.style.color = this.color;
    svg.style.left = '0';

    const carBlock = document.createElement('div');
    carBlock.className = 'car__animation__car-block';

    const stop = document.createElement('div');
    stop.className = 'car__animation__button-block__stop active-button';
    stop.innerText = 'B';

    carBlock.append(svg);
    let timer: NodeJS.Timer;

    start.addEventListener('click', async () => {
      if (!this.id) return;
      if (start.classList.contains('active-button')) return;

      const time = await setStartedCar(this.id);

      if (typeof time !== 'number') return;

      const widthBlock = carBlock.offsetWidth - svg.offsetWidth * 1.5;

      timer = setInterval(() => {
        draw(svg, widthBlock, time);
      }, 20);

      start.classList.toggle('active-button');
      stop.classList.toggle('active-button');

      await driveCar(this.id, time, timer);

      clearInterval(timer);
    });

    stop.addEventListener('click', async () => {
      if (stop.classList.contains('active-button')) return;

      await startCar([
        { key: 'id', value: `${this.id}` },
        { key: 'status', value: 'stopped' },
      ]);

      clearInterval(timer);
      svg.style.left = '0';
      start.classList.toggle('active-button');
      stop.classList.toggle('active-button');
    });

    buttons.append(start, stop);

    blockAnimation.append(buttons, carBlock);

    container.append(control, blockAnimation);

    return container;
  }
}
