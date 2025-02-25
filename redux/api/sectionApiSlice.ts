import { apiSlice } from "./apiSlice";

export const sectionApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get Section by ID
    getSectionByPageId: builder.query({
      query: (id) => `/section/page/${id}`,
    }),
    // Update Section
    updateSection: builder.mutation({
      query: (body) => ({
        url: `/section`,
        method: "PATCH",
        body,
      }),
    }),
    // Create Section
    createSection: builder.mutation({
      query: (body) => ({
        url: "/section",
        method: "POST",
        body,
      }),
    }),

    // Get Single Section
    getSection: builder.query({
      query: (id) => `/section/${id}`,
    }),

    // Remove Link From Section Content
    removeLinkFromSectionContent: builder.mutation({
      query: (body) => ({
        url: "/section/remove-link",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetSectionByPageIdQuery,
  useUpdateSectionMutation,
  useCreateSectionMutation,
  useGetSectionQuery,
  useRemoveLinkFromSectionContentMutation,
} = sectionApiSlice;
