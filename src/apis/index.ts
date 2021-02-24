import axios, { AxiosRequestConfig } from 'axios';
import { ISignInPayload } from '../store/auth/auth.type';

export const sendRequest = async (
  data: any,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  url: string,
  requireAuth = false,
  access_token = '',
) => {
  try {
    const Authorization = requireAuth
      ? {
          Authorization: `Bearer ${
            access_token
              ? `${access_token}`
              : localStorage.getItem('marine-farm')
          }`,
        }
      : {};
    const req = {
      headers: {
        ...Authorization,
        Accept: '*',
      },
      method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
    };

    Object.assign(req, method === 'GET' ? { params: data } : { data });
    const response = await axios(req);

    if (response.status >= 200 && response.status < 299) {
      const resData = await response.data;
      return resData;
    }

    return false;
  } catch (e) {
    console.log(e);
    return e?.response?.data;
  }
};

export const refreshTokenAPI = async (auth: ISignInPayload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}api/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          Refreshtoken: auth.refresh_token,
          User: auth.id,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }

    return false;
  } catch (e) {
    return e;
  }
};

export const downloadInvoice = async (id: string, access_token = '') => {
  try {
    const Authorization = {
      Authorization: `Bearer ${
        access_token ? `${access_token}` : localStorage.getItem('marine-farm')
      }`,
    };
    const req: AxiosRequestConfig = {
      headers: {
        ...Authorization,
        Accept: '*',
      },
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/subscription/invoices/download/${id}`,
      responseType: 'blob',
    };

    const response = await axios(req);

    const durl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = durl;
    link.setAttribute('download', 'invoice.pdf');
    document.body.appendChild(link);
    link.click();

    return false;
  } catch (e) {
    return e?.response?.data;
  }
};
