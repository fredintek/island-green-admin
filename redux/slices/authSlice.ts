import { UserRole } from "@/constants/auth.constant";
import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: UserRole;
};

interface InitialStateType {
  token: string | null;
  user: Partial<UserType> | null;
}

const initialState: InitialStateType = {
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },

    logoutUser: (state, action) => {
      state.token = null;
      state.user = {};
    },
  },
  extraReducers: (builder) => {},
});

export const { setAccessToken, logoutUser } = authSlice.actions;

export default authSlice.reducer;
