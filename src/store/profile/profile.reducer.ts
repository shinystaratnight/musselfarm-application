import { ProfileState, ProfileTypes } from './profile.type';
import {
  DELETE_MESSAGE,
  GET_MESSAGE,
  GET_PROFILE,
  UPDATE_AVATAR,
  UPDATE_EMAIL,
  UPDATE_PROFILE,
  UPDATE_EMAIL_PROFILE,
  INITIAL_STATE,
  SET_PERMISSION,
} from './profile.constants';

const initialState: ProfileState = {
  user: {
    email: '',
  },
  message: {
    isError: false,
    message: '',
  },
  permission: {
    isView: false,
    isEdit: false,
    isFinance: false,
  },
};

const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileTypes,
) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };
    case UPDATE_EMAIL_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          pendingEmail: action.payload.email,
        },
        message: {
          ...state.message,
          message: 'Success',
          isError: false,
          type: 'email',
        },
      };
    case UPDATE_AVATAR:
      return {
        user: {
          ...state.user,
          avatar: action.payload.avatar,
        },
        message: {
          ...state.message,
          message: 'Success',
          isError: false,
        },
      };
    case UPDATE_PROFILE:
      return {
        user: {
          ...state.user,
          name: action.payload.name,
          phone_number: action.payload.phone_number,
          company_name: action.payload.company_name,
          company_address: action.payload.company_address,
          avatar: action.payload.avatar,
          role: action.payload.role,
        },
        message: {
          ...state.message,
          message: 'Success',
          isError: false,
        },
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: {
          ...action.payload,
        },
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        message: {
          ...initialState.message,
        },
      };
    case SET_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    case INITIAL_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default profileReducer;
