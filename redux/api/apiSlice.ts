import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { logoutUser, setAccessToken } from "../slices/authSlice";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // create a fetch base query instance with credentials included
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include", // include cookies when making requests
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.token;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  // Make the initial API request
  let result = await baseQuery(args, api, extraOptions);
  // console.log("RESULT", result);

  // If forbidden (403), attempt to refresh the token
  if (result.error && result.error.status === 403) {
    console.warn("Access token expired, attempting refresh...");

    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "GET" }, // Refresh token endpoint
      api,
      extraOptions
    );

    // console.log("refreshResult", refreshResult);

    if (refreshResult.data) {
      const newAccessToken = (
        refreshResult.data as {
          status: string;
          message: string;
          data: { token: string };
        }
      ).data.token;

      // Store the new access token in Redux
      api.dispatch(setAccessToken(newAccessToken));

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh token failed, log out the user
      console.warn("Failed to refresh token. Logging out...");
      api.dispatch(logoutUser(undefined));
      toast.error("Login session expired");
    }
  }

  return result;
};

// Define a base URL for your API
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
