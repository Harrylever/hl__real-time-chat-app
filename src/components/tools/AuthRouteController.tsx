/* eslint-disable no-console */
import { IUser } from '../../../typings';
import { useEffect, useMemo } from 'react';
import { setUser } from '../../app/slices/userSlice';
import {  UserRequests} from '../../app/features/requests';
import { setToken, useAppDispatch, useAppSelector, useAxiosPrivate } from '../../app';

export default function AuthRouteController() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReduce);

  const axiosInstance = useAxiosPrivate();
  const userRequests = useMemo(() => new UserRequests(axiosInstance), [axiosInstance]);

  const sendlocation = (location: string) => {
    window.location.assign(location);
  }

  useEffect(() => {
    const authContainer = window.localStorage.getItem('auth');

    if (authContainer === null) {
      if (
        window.location.pathname === '/' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/register'
      ) {
        //
      } else {
        // If auth details is missing from localStorage and user is trying
        // accessing to access a private page, redirect them to the
        // login page
        console.log('Redirect to Login....');
        sendlocation('/login');
      }
    } else {
      const jsonifyAuthContainer = JSON.parse(authContainer) as {
        email: string;
        _id: string;
        access: string;
        refresh: string;
      };

      const fetch = userRequests.useGetUserByIdQuery(jsonifyAuthContainer._id);

      fetch
        .then((res) => {
          if (!res.success && res.message === 'user not found!') {
            window.localStorage.removeItem('auth');
            window.localStorage.removeItem('user');
            sendlocation('/login');
            return;
          }
          const userData = res.data as IUser;
          const userDataString = JSON.stringify(userData);
          localStorage.setItem('user', userDataString);
          dispatch(setUser(userData));
        })
        .catch((err) => {
          console.log(err);
        });

      if (typeof authState !== 'undefined' && authState.access !== '') {
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          // If user details available in localStorage and are stored in Redux authState/authReduce
          // and user is on admin login page send user to dashboard
          // page
          sendlocation('/');
        }
      } else {
        // If user details is available in localStorage, but are not stored in Redux authReduce
        // get details from localStorage and save in authReduce
        // Then redirect to /dashboard
        console.warn('Auth Present in Storage. Attaching to Reducer...');
        dispatch(setToken(jsonifyAuthContainer));
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          sendlocation('/');
        }
      }
    }
  }, [authState, dispatch, userRequests]);

  return null;
}
