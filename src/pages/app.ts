import { Header } from '../core/components/header';
import { PageIds } from '../types/PageIds';
import { Garage } from './Garage/garage';
import { Winners } from './Winners/winners';
import { SingletonGarage } from '../core/components/SingletonGarage';
import { SingletonWinners } from '../core/components/SingletonWinners';
import '../scss/main.scss';

export class App {
  private static container: HTMLElement = document.body;

  previousPage = '';

  async renderNewPage(idPageSource: string) {
    const idPage = idPageSource.toLowerCase();
    document.body.innerHTML = '';
    let page: Garage | Winners | null = null;

    if (idPage === PageIds.Garage) {
      page = SingletonGarage.getInstance();
    } else if (idPage === PageIds.Winners) {
      page = SingletonWinners.getInstance();
    } else {
      window.location.hash = `${PageIds.Garage}`;
      page = SingletonGarage.getInstance();
    }

    if (page) {
      const containerMain: HTMLElement = document.createElement('main');
      containerMain.className = 'main';
      containerMain.id = 'root';
      containerMain.append(await page.render());
      App.container.append(Header.render(), containerMain);
    }
  }

  enableRouteChange() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        window.location.hash = `${PageIds.Garage}`;
      } else {
        this.renderNewPage(`${hash}`);
      }
    };

    window.addEventListener('hashchange', loadPage);
    window.addEventListener('load', loadPage);
  }
  run() {
    this.enableRouteChange();
  }
}
