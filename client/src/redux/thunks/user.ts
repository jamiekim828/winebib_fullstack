import axios from 'axios';

import { AppDispatch } from '../store';
import { userActions } from '../slices/user';
import { User } from '../../types/type';
import { cartActions } from '../slices/cart';

const url = 'http://localhost:8000/user';

export function registerUserThunk(user: User) {
  return async (dispatch: AppDispatch) => {
    await axios
      .post(url, user)
      .then((res) => {
        if (res.status === 200) {
          dispatch(userActions.messageAction('Cheers! Register success!'));
          localStorage.setItem('user', res.data);
        } else {
          dispatch(userActions.messageAction(res.data));
        }
      })
      .catch((err) =>
        dispatch(userActions.messageAction(err.response.data))
      );
  };
}

export function loginUserThunk(user: User) {
  return async (dispatch: AppDispatch) => {
    await axios
      .post(`${url}/login`, user)
      .then((res) => {
        console.log(res)
        if(res.status === 200) {
        const data = res.data.userData;
        const token = res.data.token;
        dispatch(userActions.getLoginUser(data));
        dispatch(userActions.loginAction(data));
        dispatch(userActions.messageAction('Welcome! You are logged in.'))
        localStorage.setItem('loginUser', JSON.stringify(data))
        localStorage.setItem('userToken', token)
       } 
       if(res.status === 400) {
        dispatch(userActions.messageAction(res.data.message))
       }
      })
      .catch((err) =>
        dispatch(userActions.messageAction('Login failed. Please check your email and password'))
      );
  };
}

export function getUserById(id: string) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get(`${url}/${id}`);
    const data = response.data;
    dispatch(userActions.getLoginUser(data));
  };
}

export function logoutUser() {
  return async (dispatch : AppDispatch) => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('loginUser')
    dispatch(userActions.logoutAction({
      _id: '',
      userName: '',
      email: '',
      isAdmin: false
    }))
  }
  
}
