import { ReactNode } from 'react';

export interface IChangePassword {
  email?: string;
  password: string;
  new_password?: string;
  password_confirmation?: string;
  token?: string;
}

export interface IRegistration {
  email?: string;
  password?: string;
  password_confirmation?: string;
  name?: string;
  remember?: boolean;
  token?: string;
  coupon?: string;
}

export interface IUpdateBudget {
  farm_id?: number;
  expenses_id?: number;
  budget_id?: number;
  line_id?: number;
  expenses_name?: string;
  data_row?: string;
  type?: string;
  value?: string;
  comment?: string;
}

export interface ILinesUser {
  name?: string;
  id?: string;
  value?: boolean;
}

export interface IFarmsUser {
  title: string;
  id: string;
  typeChecked: string;
  lines: ILinesUser[];
}

export interface IOverviewCardValue {
  label: string;
  value: number;
}

export interface IOverviewCard {
  name: string;
  value: number | IOverviewCardValue[];
  checked?: boolean;
  color?: string;
  icon?: ReactNode;
}

interface IInterest {
  isGrow: boolean;
  interest: number;
  isReverse?: boolean;
}

export interface IFarmCard {
  date?: string;
  value?: number;
  name?: string;
  interest?: IInterest;
  unit?: string;
}

export interface IApiFarmCard {
  name: string;
  this_year: number;
  last_year: number;
}
