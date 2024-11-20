import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TempUser = {
  username: string;
  email: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: TempUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<TempUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
