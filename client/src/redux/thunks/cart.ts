import axios from 'axios';

import { AppDispatch } from '../store';
import { cartActions } from '../slices/cart';

const url = 'http://localhost:8000/order';

export function getAllOrderData () {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get(`${url}`)
        const data = response.data
        dispatch(cartActions.getAllOrders(data)) 
    }
}

export function getOrderHistoryByUserData (userId: string, token: string|null) {
    return async (dispatch: AppDispatch) => {
        axios.get(`${url}/${userId}`, {headers: { Authorization: `Bearer ${token}` }}).then(res =>
           dispatch(cartActions.getOrderHistoryByUser(res.data)) )
    }
}

export function createOrderByUserId (userId:string) {
    return async (dispatch: AppDispatch) => {
        // const request = await axios.post(`${url}/${userId}`)
    }
}