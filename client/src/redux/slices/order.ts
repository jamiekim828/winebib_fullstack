import { createSlice } from '@reduxjs/toolkit';

import { Order } from '../../types/type';

type InitialState = {
  orderHistory: Order[];
  oneOrder: Order;
  orderHistoryByUser: Order[];
  userOrder: {
    userId: string;
    address: {
      userName: string; 
      street: string; 
      houseNumber: string; 
      zip: string; city: 
      string; country: string}[];
    orders: [];
    total: number;
  };
};

const initialState: InitialState = {
  orderHistory: [],
  oneOrder: {
    _id: '',
    date: '',
    userId: '',
    address: [],
    orders: [],
    total: 0,
    isDelivered: 'Prepare',
  },
  orderHistoryByUser: [],
  userOrder: {
    userId: '',
    address: [],
    orders: [],
    total: 0
  },
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
    removeOrderHistory: (state, action) => {
      state.orderHistoryByUser = action.payload;
    },
    orderByUser: (state, action) => {
      state.userOrder = action.payload
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
