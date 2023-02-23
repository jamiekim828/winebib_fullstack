import axios from 'axios';

import { AppDispatch } from '../store';
import { userActions } from '../slices/user';

const url = 'http://localhost:8000/user';

export function getUserById (id: string) {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get(`${url}/${id}`)
        const data = response.data
        dispatch(userActions.getLoginUser(data))
    }
}

