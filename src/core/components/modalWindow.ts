export class ModalWindow {
  car;
  time;
  color;

  constructor(car: string, time: number, color: string) {
    this.car = car;
    this.time = time;
    this.color = color;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'modal-window';

    const background = document.createElement('div');
    background.className = 'modal-window__background';

    const modal = document.createElement('div');
    modal.className = 'modal-window__window';

    const info = document.createElement('div');
    info.className = 'modal-window__window__info';
    info.innerText = 'Congratulations!';

    const text = document.createElement('div');
    text.className = 'modal-window__window__text';
    text.innerText = `${this.car} arrived first (${this.time}s)`;

    const footer = document.createElement('div');
    footer.className = 'modal-window__window__footer';
    footer.innerText = 'Please wait until the race is over and then click...';

    info.style.color = `${this.color}`;
    text.style.color = `${this.color}`;
    footer.style.color = `${this.color}`;

    modal.append(info, text, footer);

    container.addEventListener('click', () => {
      container.remove();
    });

    container.append(background, modal);
    return container;
  }
}
