import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse } from '../schemas/Login'
import { SignupRequest, SignupResponse } from '../schemas/Signup'
import { RootState } from '@/store'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (signupData) => ({
        url: '/signup',
        method: 'POST',
        body: signupData,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
