import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = '';
      state.password = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
