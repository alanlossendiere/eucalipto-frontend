import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    authStatus: "not-authenticated",
    user: {},
    message: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
    },
    onLogin: (state, { payload }) => {
      (state.authStatus = "authenticated"), (state.user = payload);
    },
    onLogout: (state, { payload }) => {
      (state.status = "not-authenticated"),
        (state.user = {}),
        (state.message = payload);
    },
  },
});

export const { onChecking, onLogin, onLogout } = adminSlice.actions;
