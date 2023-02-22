import axios from 'axios';

import { AppDispatch } from '../store';
import { User } from '../../types/type';
import { userActions } from '../slices/user';

const url = 'http://localhost:8000/user';

export function registerUserThunk (value: User) {
    return async (dispatch:AppDispatch) => {
        const response = await axios.post(url, value)
        const data = await response.data
        console.log(data)
    }
}

export function loginUserThunk (value: User) {
    return async (dispatch:AppDispatch) => {
        const response = await axios.post(`${url}/login`, value)
        const data = await response.data.userData
        const token = await response.data.token
        localStorage.setItem('userToken', token)
        dispatch(userActions.getLoginUser(data))
    }
}

