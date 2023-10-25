import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, IUser } from '../../../typings';

type TLoginProps = {
  email: string;
  password: string;
};

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Post', 'Get'],
  endpoints: (build) => ({
    postLogin: build.mutation<
      { data: { access: string; refresh: string } },
      TLoginProps
    >({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Post'],
    }),
    postRegister: build.mutation<IUser, IUser>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApiSlice;