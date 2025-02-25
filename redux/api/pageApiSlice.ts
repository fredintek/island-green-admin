import { apiSlice } from "./apiSlice";

export const pageApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get All Pages
    getAllPages: builder.query({
      query: () => "/page",
    }),
    // Get Page by ID
    getPageById: builder.query({
      query: (id) => `/page/${id}`,
    }),
    // Create a new Page
    createPage: builder.mutation({
      query: (body) => ({
        url: "/page",
        method: "POST",
        body,
      }),
    }),
    // Update a Page
    updatePage: builder.mutation({
      query: (body) => ({
        url: `/page`,
        method: "PATCH",
        body,
      }),
    }),
    // Delete a Page
    deletePage: builder.mutation({
      query: (id) => ({
        url: `/page/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPagesQuery,
  useGetPageByIdQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pageApiSlice;
