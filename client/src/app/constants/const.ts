/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosResponse } from 'axios';
import { IAuthState, BASE_URL } from '../../../typings';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const useAxiosGet = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url);
  return response.data;
};

const useAxiosPost = async <T>(url: string, body?: unknown): Promise<T> => {
  let resData = null as T;
  await axiosInstance
    .post(url, body)
    .then((res) => {
      const response = res.data as T;
      resData = response;
      return response;
    })
    .catch((err) => {
      if (err?.response?.status === 403) {
        console.warn('Refresh token expired... Authentication Failed!');
        window.localStorage.removeItem('auth');
        window.location.assign('/');
      }
      throw new Error(err);
    });
  return resData;
};

const useAxiosInstance = <T>(
  method: 'POST' | 'GET',
  url: string,
  body?: unknown
): Promise<T> => {
  if (method === 'GET') {
    return useAxiosGet<T>(url);
  } else {
    return useAxiosPost<T>(url, body);
  }
};

const getLocalStorageValueForAuth = (): IAuthState | null => {
  const authDataFromStorage = window.localStorage.getItem(
    'auth'
  ) as string;
  if (authDataFromStorage === null) {
    return {
      access: '',
      refresh: '',
      email: '',
      userId: '',
    };
  }
  const authData: IAuthState = JSON.parse(authDataFromStorage);
  return authData;
};

export default useAxiosInstance;
export { axiosPrivate, getLocalStorageValueForAuth };
