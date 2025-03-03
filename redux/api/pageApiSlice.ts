import apiSlice from ".";

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
    // Get Page by Slug
    getPageBySlug: builder.query({
      query: (slug: string) => `/page/name/${slug}`,
    }),
    // Create a new Page
    createPage: builder.mutation({
      query: (body) => ({
        url: "/page",
        method: "POST",
        body,
      }),
    }),
    // Create a bulk project Page
    createBulkProjectPage: builder.mutation({
      query: (body) => ({
        url: "/page/bulk-project",
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

    // Delete a Page
    deleteBulkProject: builder.mutation({
      query: (id) => ({
        url: `/page/bulk-project/${id}`,
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
  useGetPageBySlugQuery,
  useLazyGetPageBySlugQuery,
  useCreateBulkProjectPageMutation,
  useDeleteBulkProjectMutation,
} = pageApiSlice;
