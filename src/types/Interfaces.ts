export interface ICar {
  name: string;
  color: string;
  id?: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export enum PAGEANDLIMIT {
  PAGE = '_page',
  LIMIT = '_limit',
  PAGEVALUE = '1',
  LIMITVALUE = '7',
  PAGEVALUEWIN = '1',
  LIMITVALUEWIN = '3',
}

export const SORT = {
  SORT: '_sort',
  ORDER: '_order',
  ID: 'id',
  WINS: 'wins',
  TIME: 'time',
  ASC: 'ASC',
  DESC: 'DESC',
  ACTIVESORT: '',
  ACTIVEORDER: '',
};

// export enum SORT {
//   SORT = '_sort',
//   ORDER = '_order',
//   ID = 'id',
//   WINS = 'wins',
//   TIME = 'time',
//   ASC = 'ASC',
//   DESC = 'DESC',
//   ACTIVESORT = '',
//   ACTIVEORDER = '',
// }

export interface IQueryParams {
  key: string;
  value: string;
}
