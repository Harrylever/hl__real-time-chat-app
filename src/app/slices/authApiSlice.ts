import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, IUser } from '../../../typings';

type TLoginProps = {
  email: string;
  password: string;
};

const jwtSecretKey = import.meta.env.VITE_JWT_SECRET_KEY;

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${jwtSecretKey}PassedByTheMaster`);
      return headers;
    },
  }),
  tagTypes: ['Post', 'Get'],
  endpoints: (build) => ({
    postLogin: build.mutation<
      {
        message: string;
        success: boolean;
        data: { access: string; refresh: string };
      },
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
    postVerifyGAuthAccessToken: build.mutation<
      { success: boolean; message: string; data: unknown },
      { token: string }
    >({
      query: ({ token }) => ({
        url: 'auth/verifygauthaccesstoken',
        method: 'POST',
        body: { token },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation, usePostVerifyGAuthAccessTokenMutation } = authApiSlice;