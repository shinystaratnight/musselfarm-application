import { IUtilState, UtilsTypes } from './utils.type';
import { SET_SEED_DATA, SET_MAINTENANCE_DATA } from './utils.constants';

const initialState: IUtilState = {
  seeds: [],
  maintenances: [],
};

const utilsReducer = (state = initialState, action: UtilsTypes): IUtilState => {
  switch (action.type) {
    case SET_SEED_DATA:
      return { ...state, seeds: action.payload };
    case SET_MAINTENANCE_DATA:
      return { ...state, maintenances: action.payload};
    default:
      return state;
  }
};

export default utilsReducer;
