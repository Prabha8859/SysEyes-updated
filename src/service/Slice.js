import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://shyeyes-b.onrender.com/api/user/' }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => {
        const token = localStorage.getItem('token');
        return {
          url: 'book/get_books',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    registerationStep1: builder.mutation({
      query: (registerData) => ({
        url: '/register/step1',
        method: 'POST',
        body: registerData,
      }),
    }),

    otpVerification: builder.mutation({
      query: (otpDetails) => ({
        url: '/register/verify-otp',
        method: 'POST',
        body: otpDetails,
      }),
    }),

    registerationStep2: builder.mutation({
      query: (personalDetail) => {
        const token = localStorage.getItem('token');
        return {
          url: '/register/step2',
          method: 'POST',
          body: personalDetail,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    loginUser: builder.mutation({
      query: (userdetails) => ({
        url: 'login',
        method: 'POST',
        body: userdetails,
      }),
    }),

    // ---------------- PROFILE ----------------
    activeUsers: builder.query({
      query: () => ({
        url: 'active-users',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterationStep1Mutation,
  useOtpVerificationMutation,
  useRegisterationStep2Mutation,
  useLoginUserMutation,
  useFetchUserQuery,
  useActiveUsersQuery, // ✅ Now this exists
} = usersApi;
