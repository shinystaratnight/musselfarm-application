import { IUtilState, UtilsTypes } from './utils.type';
import { SET_SEED_DATA } from './utils.constants';

const initialState: IUtilState = {
  seeds: [],
};

const utilsReducer = (state = initialState, action: UtilsTypes): IUtilState => {
  switch (action.type) {
    case SET_SEED_DATA: {
      return { ...state, seeds: action.payload };
    }
    default:
      return state;
  }
};

export default utilsReducer;
