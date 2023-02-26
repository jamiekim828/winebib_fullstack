//  product slice here
import { createSlice } from '@reduxjs/toolkit';

import { User, UserData } from '../../types/type';

type InitialState = {
  user: User;
  users: UserData[];
  loginUser: UserData;
  message: string;
};

const initialState: InitialState = {
  user: {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  users: [],
  loginUser: {
    _id: '',
    userName: '',
    email: '',
    isAdmin: false
  },
  message: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    messageAction: (state, action) => {
      state.message = action.payload
    },
    loginAction: (state, action) => {
      state.loginUser = action.payload
    },
    logoutAction: (state, action) => {
      state.loginUser = action.payload
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
