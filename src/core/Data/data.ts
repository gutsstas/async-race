import { ICar, IWinner, IQueryParams } from '../../types/Interfaces';
const baseURL = 'http://127.0.0.1:3000';

export const path = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

const getQueryParams = (queryParams: IQueryParams[]) => {
  return queryParams.length ? `?${queryParams.map((x) => `${x.key}=${x.value}`).join('&')}` : '';
};

export const getData = async (queryParams: IQueryParams[]) => {
  const res = await fetch(`${baseURL}${path.garage}${getQueryParams(queryParams)}`);
  const data = await res.json();
  const count = Number(res.headers.get('X-Total-Count'));
  return { data, count };
};

export const getCar = async (id: number) => {
  const res = await fetch(`${baseURL}${path.garage}/${id}`);
  const data = await res.json();
  return data;
};

export const createCar = async (car: ICar) => {
  await fetch(`${baseURL}${path.garage}`, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const removeCar = async (id: number) => {
  await fetch(`${baseURL}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  await fetch(`${baseURL}${path.winners}/${id}`, {
    method: 'DELETE',
  });
};

export const updateCar = async (id: number, car: ICar) => {
  await fetch(`${baseURL}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
};

export const startCar = async (queryParams: IQueryParams[]) => {
  const res = await fetch(`${baseURL}${path.engine}${getQueryParams(queryParams)}`, {
    method: 'PATCH',
  });

  if (!res.ok) {
    return res.ok;
  }

  const data = await res.json();
  const time = Math.ceil(data.distance / data.velocity) / 1000;

  return time;
};

export const getWinners = async (queryParams: IQueryParams[]) => {
  const res = await fetch(`${baseURL}${path.winners}${getQueryParams(queryParams)}`);
  const data = await res.json();
  const count = Number(res.headers.get('X-Total-Count'));
  return { data, count };
};

export const checkWinner = async (id: number) => {
  const res = await fetch(`${baseURL}${path.winners}/${id}`);
  const data = await res.json();
  return data;
};

export const sendWinner = async (body: IWinner) => {
  try {
    const res = await fetch(`${baseURL}${path.winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await res.json();
  } catch {
    // eslint-disable-next-line no-console
    console.log('error');
    const car = await checkWinner(body.id);

    if (body.time < car.time) car.time = body.time;

    car.wins++;

    await fetch(`${baseURL}${path.winners}/${body.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        wins: car.wins,
        time: car.time,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
