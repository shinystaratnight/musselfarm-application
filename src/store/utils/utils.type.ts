import { SET_SEED_DATA } from './utils.constants';

export type IUtilState = {
  seeds: IUtilsData;
};

interface ISetSeedData {
  type: typeof SET_SEED_DATA;
  payload: IUtilsData;
}

export type IUtilsData = Array<IUtilData>;

export interface IUtilData {
  key?: number;
  id: string | number;
  name: string;
  type: string;
}

export type UtilsTypes =
  | ISetSeedData
