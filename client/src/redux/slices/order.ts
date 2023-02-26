import { createSlice } from '@reduxjs/toolkit';

import { Order } from '../../types/type';

type InitialState = {
  orderHistory: Order[];
  oneOrder: Order;
  orderHistoryByUser: Order[];
  
};

const initialState: InitialState = {
  orderHistory: [],
  oneOrder: {
    _id: '',
    date: '',
    userId: '',
    address: '',
    orders: [],
    total: 0,
    isDelivered: 'Prepare',
  },
  orderHistoryByUser: [],
  
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getAllOrders: (state, action) => {
      state.orderHistory = action.payload;
    },
    getOneOrder: (state, action) => {
      state.oneOrder = action.payload;
    },
    getOrderHistoryByUser: (state, action) => {
      state.orderHistoryByUser = action.payload;
    },
    removeOrderHistory : (state, action) => {
      state.orderHistoryByUser = action.payload
    }
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
