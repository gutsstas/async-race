import { getCarList } from './getCar';
import { ICar } from '../../types/Interfaces';
import { setStartedCar, driveCar } from './getCar';
import { sendWinner } from '../Data/data';
import { ModalWindow } from './modalWindow';

export const startRace = async () => {
  const objData = await getCarList();
  const arrayId = objData.data.map((i: ICar) => i.id);

  const buttonA = document.querySelectorAll('.car__animation__button-block__start');
  for (let i = 0; i < buttonA.length; i++) {
    buttonA[i].classList.toggle('active-button');
  }

  const arrayTime = await Promise.all(arrayId.map(async (id: number) => await setStartedCar(id)));
  let find = false;

  const arrayTimer = await Promise.allSettled(
    arrayTime.map(async (time: number, index: number) => {
      const prom = await driveCar(arrayId[index], time);

      if (!find && prom.result !== false) {
        console.log('Победил', arrayId[index], objData.data[index]);
        const modal = new ModalWindow(objData.data[index].name, arrayTime[index], objData.data[index].color);
        document.body.append(modal.render());
        sendWinner({ id: arrayId[index], wins: 1, time: arrayTime[index] });
        find = true;
      }
    })
  );
  // eslint-disable-next-line no-console
  console.log(arrayTimer);

  arrayTime.forEach((time) => clearInterval(time));
};
