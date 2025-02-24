import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get All Users
    getAllUsers: builder.query({
      query: () => "/user",
    }),
    // Get User by ID
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    // Update User Role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/user/role`,
        method: "PATCH",
        body: { userId, role },
      }),
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApiSlice;
