import { SET_AUTOMATIONS_DATA } from './automation.constants';

export type IAutomationState = {
  automationsData: IAutomationsData;
};

export interface IAutomation {
  id: string | number;
  condition: string;
  action: string;
  time: number;
  outcome: {
    title: string;
    description: string;
  };
}

export type IAutomationsData = Array<IAutomation>;

export interface ISetAutomationData {
  type: typeof SET_AUTOMATIONS_DATA
  payload: IAutomationsData;
}

export type UiTypes = ISetAutomationData;
