import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "checking",
    user: {},
    message: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.message = undefined;
    },
    onLogin: (state, { payload }) => {
      (state.status = "authenticated"),
        (state.user = payload),
        (state.message = undefined);
    },
    onLogout: (state, { payload }) => {
      (state.status = "not-authenticated"),
        (state.user = {}),
        (state.message = payload);
    },
  },
});

export const { onChecking, onLogin, onLogout } = adminSlice.actions;
