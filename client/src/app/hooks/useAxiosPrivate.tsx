/* eslint-disable no-console */
import { useEffect, useCallback } from 'react';
import useRefreshToken from './useRefreshToken';
import useLogOutUser from './useLogOutUser';
import { useAppSelector } from './hooks';
import { IAuthState } from '../../../typings';
import { axiosPrivate } from '../constants/const';

const useAxiosPrivate = () => {
  const { access } = useAppSelector((state) => state.authReduce);

  const logOut = useLogOutUser();
  const refresh = useRefreshToken();

  const getAccessTokenFromStorage = useCallback(() => {
    const authDataFromStorage = window.localStorage.getItem(
      'auth'
    ) as string;
    if (authDataFromStorage === null) {
      logOut();
      return;
    }
    const authData: IAuthState = JSON.parse(authDataFromStorage);
    return authData.access;
  }, [logOut]);

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${getAccessTokenFromStorage()}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        // If access token expired
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.warn('Access token expired... Refresh token sent.');
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken.data.access}`;
          return axiosPrivate(prevRequest);
        }

        // If refresh token expired
        if (error?.response?.status === 403) {
          console.warn('Refresh token expired... Authentication Failed!');
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [access, getAccessTokenFromStorage, logOut, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
