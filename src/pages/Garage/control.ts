import { createCar, startCar, updateCar } from '../../core/Data/data';
import { refreshListCar, selectCar } from '../../core/components/addCar';
import { ACTIVE } from '../../core/components/car';
import { generationArrayCar } from '../../core/components/generationCar';
import { ICar } from '../../types/Interfaces';
import { getCarList } from '../../core/components/getCar';
import { startRace } from '../../core/components/race';
import { returnStatusButton } from '../../core/components/pagination';

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
      returnStatusButton();
    });

    createBlock.append(inputText, inputColor, createBtn);

    const changeBlock = document.createElement('div');
    changeBlock.className = 'control__change';

    const changeText = document.createElement('input');
    changeText.className = 'control__change__input-text';
    changeText.type = 'text';
    changeText.setAttribute('readonly', '');

    const changeColor = document.createElement('input');
    changeColor.className = 'control__change__input-color';
    changeColor.type = 'color';

    const changeBtn = document.createElement('button');
    changeBtn.className = 'control__change__change-button active__change-button';
    changeBtn.innerText = 'Change';

    changeBtn.addEventListener('click', async () => {
      if (changeBtn.classList.contains('active__change-button')) return;

      const id = +document.querySelectorAll(`.${ACTIVE.ACTIVECLASS}`)[0].className.replace(/[\D]+/g, '');
      await updateCar(id, { name: changeText.value, color: changeColor.value });
      await refreshListCar();

      selectCar();
      changeBtn.classList.add('active__change-button');
      changeText.value = '';
      changeText.setAttribute('readonly', '');

      returnStatusButton();
    });

    changeBlock.append(changeText, changeColor, changeBtn);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'control__button-container';

    const race = document.createElement('button');
    race.className = 'button-container__race';
    race.innerText = 'Race';

    race.addEventListener('click', async () => {
      document.body.classList.add('block-body');

      if (race.classList.contains('active-control-button')) return;

      race.classList.add('active-control-button');
      generation.classList.add('active-control-button');

      await startRace();

      reset.classList.remove('active-control-button');
      generation.classList.remove('active-control-button');
    });

    const reset = document.createElement('button');
    reset.className = 'button-container__reset active-control-button';
    reset.innerText = 'Reset';

    reset.addEventListener('click', async () => {
      if (reset.classList.contains('active-control-button')) return;

      const objData = await getCarList();
      const arrayId = objData.data.map((i: ICar) => i.id);

      await Promise.all(
        arrayId.map(async (id: number) => {
          await startCar([
            { key: 'id', value: `${id}` },
            { key: 'status', value: 'stopped' },
          ]);
        })
      );

      const listCar = <NodeListOf<HTMLElement>>document.querySelectorAll('.fa-solid.fa-truck-monster');
      const buttonA = document.querySelectorAll('.car__animation__button-block__start');

      for (let i = 0; i < listCar.length; i++) {
        listCar[i].style.left = '0';
        buttonA[i].classList.toggle('active-button');
      }
      returnStatusButton();
    });

    const generation = document.createElement('button');
    generation.className = 'button-container__generation';
    generation.innerText = 'Generation';

    generation.addEventListener('click', async () => {
      if (generation.classList.contains('active-control-button')) return;
      const arrayCars = generationArrayCar();

      await Promise.all(arrayCars.map((car) => createCar(car)));

      await refreshListCar();
      returnStatusButton();
    });

    buttonContainer.append(race, reset, generation);

    control.append(createBlock, changeBlock, buttonContainer);

    return control;
  }
}
