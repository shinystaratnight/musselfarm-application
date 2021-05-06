import { IRootState, IThunkType } from '../rootReducer';
import { TasksTypes, ITasksData, ITaskData } from './tasks.type';

import { SET_TASK_DATA } from './tasks.constants';

import { isSpinner } from '../ui/ui.actions';
import { composeApi } from '../../apis/compose';

export const setTasksData = (data: ITasksData): TasksTypes => {
  return {
    type: SET_TASK_DATA,
    payload: data,
  };
};

export const getTaskData = (history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {},
        method: 'GET',
        url: 'api/task/tasks',
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData?.data) {
      dispatch(setTasksData(responseData.data));
    }

    dispatch(isSpinner(false));
  };
};

export const addTask = (newTask: ITaskData, history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: newTask,
        method: 'POST',
        url: 'api/task/tasks',
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getTaskData(history));
    }

    dispatch(isSpinner(false));
  };
};

export const removeTask = (taskId: number, history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {},
        method: 'DELETE',
        url: `api/task/tasks/${taskId}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getTaskData(history));
    }

    dispatch(isSpinner(false));
  };
};

export const removeAllTasks = (history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {},
        method: 'POST',
        url: `api/task/remove-completed-tasks`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getTaskData(history));
    }

    dispatch(isSpinner(false));
  };
};

export const updateTask = (task: ITaskData, history: any): IRootState => {
  return async (dispatch: IThunkType, getState: () => IRootState) => {
    dispatch(isSpinner(true));

    const responseData = await composeApi(
      {
        data: {
          ...task,
          _method: 'PATCH',
        },
        method: 'POST',
        url: `api/task/tasks/${task.id}`,
        requireAuth: true,
      },
      dispatch,
      getState().auth.auth,
      history,
    );

    if (responseData.status === 'success') {
      dispatch(getTaskData(history));
    }

    dispatch(isSpinner(false));
  };
};

// export const updateUtil = (newUtil: IUtilData, history: any): IRootState => {
//   return async (dispatch: IThunkType, getState: () => IRootState) => {
//     dispatch(isSpinner(true));

//     const responseData = await composeApi(
//       {
//         data: {
//           name: newUtil.name,
//           type: newUtil.type,
//           _method: 'PATCH',
//         },
//         method: 'POST',
//         url: `api/util/utils/${newUtil.id}`,
//         requireAuth: true,
//       },
//       dispatch,
//       getState().auth.auth,
//       history,
//     );

//     if (responseData?.status === 'success') {
//       dispatch(getUtilData(newUtil.type, history));
//     } else {
//       // dispatch(
//       //   showFeedback({
//       //     isMessage: true,
//       //     type: 'error',
//       //     message: `Failed to load information`,
//       //   }),
//       // );
//     }

//     dispatch(isSpinner(false));
//   };
// };

// export const removeUtil = (
//   utilId: string | number,
//   utilType: string,
//   history: any,
// ): IRootState => {
//   return async (dispatch: IThunkType, getState: () => IRootState) => {
//     dispatch(isSpinner(true));

//     const responseData = await composeApi(
//       {
//         data: {
//           _method: 'delete',
//         },
//         method: 'POST',
//         url: `api/util/utils/${utilId}`,
//         requireAuth: true,
//       },
//       dispatch,
//       getState().auth.auth,
//       history,
//     );

//     if (responseData?.status === 'success') {
//       dispatch(getUtilData(utilType, history));
//     } else {
//       // dispatch(
//       //   showFeedback({
//       //     isMessage: true,
//       //     type: 'error',
//       //     message: `Failed to load information`,
//       //   }),
//       // );
//     }

//     dispatch(isSpinner(false));
//   };
// };

// export const addUtil = (
//   value: string,
//   type: string,
//   history: any,
// ): IRootState => {
//   return async (dispatch: IThunkType, getState: () => IRootState) => {
//     dispatch(isSpinner(true));

//     const responseData = await composeApi(
//       {
//         data: {
//           name: value,
//           type: type.toLowerCase(),
//         },
//         method: 'POST',
//         url: `api/util/utils`,
//         requireAuth: true,
//       },
//       dispatch,
//       getState().auth.auth,
//       history,
//     );

//     if (responseData?.status === 'success') {
//       dispatch(getUtilData(type, history));
//     } else {
//       // dispatch(
//       //   showFeedback({
//       //     isMessage: true,
//       //     type: 'error',
//       //     message: `Failed to load information`,
//       //   }),
//       // );
//     }

//     dispatch(isSpinner(false));
//   };
// };
