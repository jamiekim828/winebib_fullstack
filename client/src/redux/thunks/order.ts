import axios from 'axios';

import { AppDispatch } from '../store';
import { orderActions } from '../slices/order';

const url = 'http://localhost:8000/order';

export function getAllOrderData () {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get(`${url}`)
        const data = response.data
        dispatch(orderActions.getAllOrders(data)) 
    }
}

export function getOrderHistoryByUserData (userId: string, token: string|null) {
    return async (dispatch: AppDispatch) => {
        axios.get(`${url}/${userId}`, {headers: { Authorization: `Bearer ${token}` }}).then(res =>
           dispatch(orderActions.getOrderHistoryByUser(res.data)) )
    }
}

export function createOrderByUserId (userId:string) {
    return async (dispatch: AppDispatch) => {
        // const request = await axios.post(`${url}/${userId}`)
    }
}