import { Garage } from '../../pages/Garage/garage';

export class SingletonGarage {
  private static instance: Garage;

  public static getInstance(): Garage {
    if (!SingletonGarage.instance) {
      SingletonGarage.instance = new Garage();
    }
    return SingletonGarage.instance;
  }
}
