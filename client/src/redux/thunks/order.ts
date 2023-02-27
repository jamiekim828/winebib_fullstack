import axios from 'axios';

import { AppDispatch } from '../store';
import { orderActions } from '../slices/order';
import { Cart } from '../../types/type';
import { userActions } from '../slices/user';

const url = 'http://localhost:8000/order';

export function getAllOrderData() {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get(`${url}`);
    const data = response.data;
    dispatch(orderActions.getAllOrders(data));
  };
}

export function getOrderHistoryByUserData(
  userId: string,
  token: string | null
) {
  return async (dispatch: AppDispatch) => {
    axios
      .get(`${url}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(orderActions.getOrderHistoryByUser(res.data)));
  };
}

export function createOrderByUserId(
  userId: string,
  userToken: string | null,
  order: Cart
) {
  return async (dispatch: AppDispatch) => {
    await axios
      .post(`${url}/${userId}`, order, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if(res.status === 200) {
          dispatch(userActions.messageAction('Thank you for your purchase!'))
        }
        if(res.status === 404) {
          dispatch(userActions.messageAction('Please login'))
        }
      })
      .catch((err) => dispatch(userActions.messageAction('Server error')))
  };
}
