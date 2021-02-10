import { LOGOUT, SIGN_IN, NEXT_VIEW, UPDATE_TOKEN } from './auth.constants';
import { AuthState, AuthTypes } from './auth.type';

const initialState: AuthState = {
  nextView: {
    isSuccess: false,
    email: '',
  },
  auth: {
    isAuth: false,
    access_token: '',
    id: '',
  },
};

const authReducer = (state: AuthState = initialState, action: AuthTypes) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: { ...action.payload },
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        auth: { ...action.payload },
      };
    case LOGOUT:
      return {
        ...state,
        auth: { ...initialState.auth },
      };
    case NEXT_VIEW:
      return { ...state, nextView: { ...action.payload } };
    default:
      return state;
  }
};

export default authReducer;
