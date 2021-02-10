import { LOGOUT, SIGN_IN, NEXT_VIEW, UPDATE_TOKEN } from './auth.constants';

export interface AuthState {
  nextView: INextView;
  auth: ISignInPayload;
}

export interface ISignUpSuccess {
  type: typeof NEXT_VIEW;
  payload: INextView;
}

export interface INextView {
  isSuccess?: boolean;
  email?: string;
  message?: string;
}

export interface ISignInType {
  type: typeof SIGN_IN;
  payload: ISignInPayload;
}

export interface ISignInPayload {
  isAuth?: boolean;
  access_token?: string;
  refresh_token?: string;
  message?: string;
  id?: string;
}

export interface IUpdateTokenType {
  type: typeof UPDATE_TOKEN;
  payload: ISignInPayload;
}

export interface ILogout {
  type: typeof LOGOUT;
}

export interface ILoginData {
  email: string;
  password: string;
  remember: boolean;
}

export type AuthTypes =
  | ISignInType
  | ISignUpSuccess
  | ILogout
  | IUpdateTokenType;
