import { IAutomationState, ISetAutomationData } from './automation.type';
import { SET_AUTOMATIONS_DATA } from './automation.constants';

const initialState: IAutomationState = {
  automationsData: [],
};

const automationReducer = (
  state = initialState,
  action: ISetAutomationData,
): IAutomationState => {
  switch (action.type) {
    case SET_AUTOMATIONS_DATA:
      return { ...state, automationsData: [...action.payload] };
    default:
      return state;
  }
};

export default automationReducer;
