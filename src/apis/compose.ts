import { logOut, updateToken } from '../store/auth/auth.actions';
import { refreshTokenAPI, sendRequest } from './index';
import { ISignInPayload } from '../store/auth/auth.type';

interface requestData {
  data: any;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  url: string;
  requireAuth?: boolean;
}

export const composeApi = async (
  reqData: requestData,
  dispatch: any,
  authStore: ISignInPayload,
  history: any,
) => {
  const { data, method, url, requireAuth } = reqData;
  const responseData = await sendRequest(
    data,
    method,
    url,
    requireAuth,
    authStore.access_token,
  );
  if (
    responseData?.message === 'Unauthenticated.' &&
    authStore?.access_token &&
    authStore?.refresh_token
  ) {
    const responseRefresh = await refreshTokenAPI(authStore);
    if (responseRefresh?.status === 'Success') {
      localStorage.setItem('marine-farm', responseRefresh?.data.access_token);
      localStorage.setItem(
        'marine-farm-refresh',
        responseRefresh?.data.refresh_token,
      );
      await dispatch(
        updateToken({
          isAuth: true,
          access_token: responseRefresh?.data.access_token,
          refresh_token: responseRefresh?.data.refresh_token,
          id: responseRefresh.user_id,
        }),
      );
      const repeatResponse = await sendRequest(
        data,
        method,
        url,
        requireAuth,
        responseRefresh?.data?.access_token,
      );

      if (repeatResponse?.message === 'Unauthenticated.') {
        dispatch(logOut());
        history.push('/sign-in');

        return 0;
      }

      return repeatResponse;
    }
    dispatch(logOut());
    history.push('/sign-in');

    return responseData;
  }

  return responseData;
};
