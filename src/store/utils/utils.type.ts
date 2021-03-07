import {
  SET_SEED_DATA,
  SET_MAINTENANCE_DATA,
  SET_COLOR_DATA,
  SET_SEEDTYPE_DATA,
} from './utils.constants';

export type IUtilState = {
  seeds: IUtilsData;
  maintenances: IUtilsData;
  colors: IUtilsData;
  seedtypes: IUtilsData;
};

interface ISetSeedData {
  type: typeof SET_SEED_DATA;
  payload: IUtilsData;
}

interface ISetMaintenanceData {
  type: typeof SET_MAINTENANCE_DATA;
  payload: IUtilsData;
}

interface ISetColorData {
  type: typeof SET_COLOR_DATA;
  payload: IUtilsData;
}

interface ISetSeedTypeData {
  type: typeof SET_SEEDTYPE_DATA;
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
  | ISetMaintenanceData
  | ISetColorData
  | ISetSeedTypeData;
