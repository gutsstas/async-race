import { createCar, startCar, updateCar, sendWinner } from '../../core/Data/data';
import { refreshListCar, selectCar } from '../../core/components/addCar';
import { ACTIVE } from '../../core/components/car';
import { generationArrayCar } from '../../core/components/generationCar';
import { ICar } from '../../types/Interfaces';
import { setStartedCar, driveCar, getCarList } from '../../core/components/getCar';

export class Control {
  static render() {
    const control = document.createElement('div');
    control.className = 'main__garage__control';

    const createBlock = document.createElement('div');
    createBlock.className = 'control__create';

    const inputText = document.createElement('input');
    inputText.className = 'control__input-text';
    inputText.type = 'text';

    const inputColor = document.createElement('input');
    inputColor.className = 'control__input-color';
    inputColor.type = 'color';

    const createBtn = document.createElement('button');
    createBtn.className = 'control__create-button';
    createBtn.innerText = 'Create';

    createBtn.addEventListener('click', async () => {
      await createCar({
        name: inputText.value,
        color: inputColor.value,
      });
      await refreshListCar();
    });

    createBlock.append(inputText, inputColor, createBtn);

    const changeBlock = document.createElement('div');
    changeBlock.className = 'control__change';

    const changeText = document.createElement('input');
    changeText.className = 'control__change__input-text';
    changeText.type = 'text';

    const changeColor = document.createElement('input');
    changeColor.className = 'control__change__input-color';
    changeColor.type = 'color';

    const changeBtn = document.createElement('button');
    changeBtn.className = 'control__change__change-button';
    changeBtn.innerText = 'Change';

    changeBtn.addEventListener('click', async () => {
      const id = +document.querySelectorAll(`.${ACTIVE.ACTIVECLASS}`)[0].className.replace(/[\D]+/g, '');
      await updateCar(id, { name: changeText.value, color: changeColor.value });
      await refreshListCar();
      selectCar();
    });

    changeBlock.append(changeText, changeColor, changeBtn);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'control__button-container';

    const race = document.createElement('button');
    race.className = 'button-container__race';
    race.innerText = 'Race';

    race.addEventListener('click', async () => {
      const objData = await getCarList();
      const arrayId = objData.data.map((i: ICar) => i.id);
      const arrayTime = await Promise.all(arrayId.map(async (id: number) => await setStartedCar(id)));
      // eslint-disable-next-line no-console
      console.log(arrayTime);
      let find = false;
      const arrayTimer = await Promise.allSettled(
        arrayTime.map(async (time: number, index: number) => {
          const prom = await driveCar(arrayId[index], time);

          if (!find && prom.result !== false) {
            // eslint-disable-next-line no-console
            console.log('Победил', arrayId[index], objData.data[index]);
            sendWinner({ id: arrayId[index], wins: 1, time: arrayTime[index] });
            find = true;
          }
        })
      );
      // eslint-disable-next-line no-console
      console.log(arrayTimer);

      arrayTime.forEach((time) => clearInterval(time));
    });

    const reset = document.createElement('button');
    reset.className = 'button-container__reset';
    reset.innerText = 'Reset';

    reset.addEventListener('click', async () => {
      const objData = await getCarList();
      const arrayId = objData.data.map((i: ICar) => i.id);
      await Promise.allSettled(
        arrayId.map(async (id: number) => {
          await startCar([
            { key: 'id', value: `${id}` },
            { key: 'status', value: 'stopped' },
          ]);
        })
      );
      const listCar = <NodeListOf<HTMLElement>>document.querySelectorAll('.fa-solid.fa-truck-monster');
      for (let i = 0; i < listCar.length; i++) {
        listCar[i].style.left = '0';
      }
    });

    const generation = document.createElement('button');
    generation.className = 'button-container__generation';
    generation.innerText = 'Generation';

    generation.addEventListener('click', async () => {
      const arrayCars = generationArrayCar();
      await Promise.all(arrayCars.map((car) => createCar(car)));
      await refreshListCar();
    });

    buttonContainer.append(race, reset, generation);

    control.append(createBlock, changeBlock, buttonContainer);

    return control;
  }
}
