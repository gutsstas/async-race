import { Winners } from '../../pages/Winners/winners';

export class SingletonWinners {
  private static instance: Winners;

  public static getInstance(): Winners {
    if (!SingletonWinners.instance) {
      SingletonWinners.instance = new Winners();
    }
    return SingletonWinners.instance;
  }
}
