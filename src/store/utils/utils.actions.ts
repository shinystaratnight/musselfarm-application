import { IRootState, IThunkType } from '../rootReducer';
import { UtilsTypes, IUtilsData, IUtilData } from './utils.type';
import { SET_SEED_DATA } from './utils.constants';

import { isModal, isSpinner } from '../ui/ui.actions';
import { composeApi } from '../../apis/compose';
import randomKey from '../../util/randomKey';
import { transformSeed } from '../../util/farmUtil';

export const setSeedData = (data: IUtilsData): UtilsTypes => {
  return {
    type: SET_SEED_DATA,
    payload: data,
  };
};

export const getSeedData = (history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {},
        method: 'GET',
        url: 'api/util/utils',
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.data) {
      if (responseData?.data?.length) {
        const dataWithKey = transformSeed(responseData?.data);

        dispatch(setSeedData(dataWithKey));
      } else {
        dispatch(setSeedData(responseData?.data));
      }
    } else {
      // dispatch(
      //   showFeedback({
      //     isMessage: true,
      //     type: 'error',
      //     message: `Failed to load information`,
      //   }),
      // );
    }

    dispatch(isSpinner(false));
  };
};

export const updateUtil = (newUtil: IUtilData, history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {
          name: newUtil.name,
          type: newUtil.type,
          _method: 'PATCH',
        },
        method: 'POST',
        url: `api/util/utils/${newUtil.id}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.status === 'success') {
      dispatch(getSeedData(history));
    } else {
      // dispatch(
      //   showFeedback({
      //     isMessage: true,
      //     type: 'error',
      //     message: `Failed to load information`,
      //   }),
      // );
    }

    dispatch(isSpinner(false));
  };
};

export const removeUtil = (
  utilId: string | number,
  history: any,
): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {
          _method: 'delete',
        },
        method: 'POST',
        url: `api/util/utils/${utilId}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.status === 'success') {
      dispatch(getSeedData(history));
    } else {
      // dispatch(
      //   showFeedback({
      //     isMessage: true,
      //     type: 'error',
      //     message: `Failed to load information`,
      //   }),
      // );
    }

    dispatch(isSpinner(false));
  };
};

export const addUtil = (
  value: string,
  type: string,
  history: any,
): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {
          name: value,
          type: type.toLowerCase(),
        },
        method: 'POST',
        url: `api/util/utils`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.status === 'success') {
      dispatch(getSeedData(history));
    } else {
      // dispatch(
      //   showFeedback({
      //     isMessage: true,
      //     type: 'error',
      //     message: `Failed to load information`,
      //   }),
      // );
    }

    dispatch(isSpinner(false));
  };
};
