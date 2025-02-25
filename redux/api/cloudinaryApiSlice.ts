import { apiSlice } from "./apiSlice";

export const cloudinaryApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // delete image
    deleteFileFromCloudinary: builder.mutation({
      query: (publicId) => ({
        url: `/cloudinary/remove-file`,
        method: "DELETE",
        body: { publicId },
      }),
    }),
  }),
});

export const { useDeleteFileFromCloudinaryMutation } = cloudinaryApiSlice;
