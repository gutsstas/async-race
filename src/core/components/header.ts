export class Header {
  static render() {
    const container = document.createElement('header');
    container.className = 'header';

    const garageBtn = document.createElement('button');
    garageBtn.className = 'header__button garage';
    garageBtn.textContent = 'TO GARAGE';

    garageBtn.addEventListener('click', () => {
      window.location.hash = '/garage';
    });

    const winnersBtn = document.createElement('button');
    winnersBtn.className = 'header__button winners';
    winnersBtn.textContent = 'TO WINNERS';

    winnersBtn.addEventListener('click', () => {
      window.location.hash = '/winners';
    });

    container.append(garageBtn, winnersBtn);
    return container;
  }
}
