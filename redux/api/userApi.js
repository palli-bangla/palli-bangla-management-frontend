import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '/user',
    }),
    getUserById: build.query({
      query: (id) => `/user/${id}`, // This will make a GET request to /user/{id}
    }),
    addUser: build.mutation({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useDeleteUserMutation } = userApi;
