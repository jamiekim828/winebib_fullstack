//  product slice here
import { createSlice } from '@reduxjs/toolkit';

import { User, UserData } from '../../types/type';

type InitialState = {
  user: User;
  users: UserData[];
  loginUser: UserData;
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
    id: '',
    userName: '',
    email: '',
    isAdmin: false
  },
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
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
