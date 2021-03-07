import { IUtilState, UtilsTypes } from './utils.type';
import {
  SET_SEED_DATA,
  SET_MAINTENANCE_DATA,
  SET_COLOR_DATA,
  SET_SEEDTYPE_DATA,
} from './utils.constants';

const initialState: IUtilState = {
  seeds: [],
  maintenances: [],
  colors: [],
  seedtypes: [],
};

const utilsReducer = (state = initialState, action: UtilsTypes): IUtilState => {
  switch (action.type) {
    case SET_SEED_DATA:
      return { ...state, seeds: action.payload };
    case SET_MAINTENANCE_DATA:
      return { ...state, maintenances: action.payload };
    case SET_COLOR_DATA:
      return { ...state, colors: action.payload };
    case SET_SEEDTYPE_DATA:
      return { ...state, seedtypes: action.payload };
    default:
      return state;
  }
};

export default utilsReducer;
