import apiSlice from ".";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login admin
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),

    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // create user
    createUser: builder.mutation({
      query: ({ email, role }) => ({
        url: "/auth/create",
        method: "POST",
        body: { email, role },
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, email, password }) => ({
        url: `/auth/reset-password/`,
        method: "PATCH",
        body: { token, email, password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApiSlice;
