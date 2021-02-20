import { SET_SUBSCRIPTION_STATUS } from './subscription.constants';

export interface ISubscriptionState {
  status: string;
  active_data?: any;
  history?: any;
  payment_method?: any;
}

export interface ICardDetails {
  cvv: string;
  date: string;
  number: string;
  email: string;
  holder: string;
}

export interface ISubscriptAction {
  type: typeof SET_SUBSCRIPTION_STATUS;
  payload: ISubscriptionState;
}

export type ISubscriptionTypes = ISubscriptAction;