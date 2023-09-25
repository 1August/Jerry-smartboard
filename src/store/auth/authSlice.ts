import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/schemas/UserSchema.ts";
import { LoginResponse, Token } from "@/schemas/Login.ts";
import { RootState } from "@/store";

export type AuthStateUser = User | null;
export type AuthStateToken = Token | null;
export type AuthState = {
  user: AuthStateUser;
  token: AuthStateToken;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      { payload }: PayloadAction<LoginResponse>,
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state: AuthState) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserToken = (state: RootState) => state.auth.token;
