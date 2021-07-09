import {
  IAutomationsData,
  ISetAutomationData,
  IAutomationState,
  IAutomation,
} from './automation.type';
import { SET_AUTOMATIONS_DATA } from './automation.constants';
import { IRootState, IThunkType } from '../rootReducer';
import { isSpinner } from '../ui/ui.actions';
import { composeApi } from '../../apis/compose';

export const setAutomations = (
  payload: IAutomationsData,
): ISetAutomationData => ({
  type: SET_AUTOMATIONS_DATA,
  payload,
});

export const getAutomationsData = (history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));
    const responseData = await composeApi(
      {
        data: {},
        method: 'GET',
        url: 'api/automation/automations',
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.data) {
      if (responseData?.data?.length) {
        dispatch(
          setAutomations(
            responseData.data.map((automation: any) => {
              return {
                id: automation.id,
                condition: automation.condition,
                action: automation.action,
                time: automation.time,
                outcome: {
                  title: automation.title,
                  description: automation.description,
                },
              };
            }),
          ),
        );
      }
    }
    dispatch(isSpinner(false));
  };
};

export const addAutomation = (
  newAutomation: IAutomation,
  history: any,
): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: newAutomation,
        method: 'POST',
        url: 'api/automation/automations',
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getAutomationsData(history));
    }

    dispatch(isSpinner(false));
  };
};

export const updateAutomation = (
  automation: IAutomation,
  history: any,
): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {
          ...automation,
          _method: 'PATCH',
        },
        method: 'POST',
        url: `api/automation/automations/${automation.id}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getAutomationsData(history));
    }

    dispatch(isSpinner(false));
  };
};

export const removeAutomation = (
  automationId: number,
  history: any,
): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {},
        method: 'DELETE',
        url: `api/automation/automations/${automationId}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getAutomationsData(history));
    }

    dispatch(isSpinner(false));
  };
};
