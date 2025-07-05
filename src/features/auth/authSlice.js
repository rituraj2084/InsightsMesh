import { createSlice } from '@reduxjs/toolkit';

const getInitialAuth = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialAuth(),
  },
  reducers: {
    login: (state, action) => {
      const user = {
        username: action.payload,
        token: Math.random().toString(36).substr(2), // fake token
      };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
