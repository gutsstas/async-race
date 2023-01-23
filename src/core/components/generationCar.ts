import { carBrands } from '../Data/car brands';
import { ICar } from '../../types/Interfaces';

export function addCarBrand() {
  const brandLenth = carBrands.length;
  const randomBrand = Math.floor(Math.random() * brandLenth);
  const brand = carBrands[randomBrand];
  const modelLenth = brand.models.length;
  const randomModel = Math.floor(Math.random() * modelLenth);
  const model = brand.models[randomModel];
  return `${brand.name} ${model}`;
}

export function generationArrayCar() {
  const result: ICar[] = [];
  for (let i = 0; i < 100; i++) {
    result.push({ name: addCarBrand(), color: addColor() });
  }
  return result;
}

export function addColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
