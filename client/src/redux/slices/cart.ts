import { createSlice } from '@reduxjs/toolkit';

import { Order } from '../../types/type';

type InitialState = {
  orderHistory: Order[];
  oneOrder: Order;
  orderHistoryByUser: Order[];
  cart: {
    productId: '';
    name: '';
    image: '';
    price: 0;
    quantity: 0;
  }[];
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
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
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
    },
    addToCartAction: (state, action) => {
      const index = state.cart.findIndex(
        (wine) => wine.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    minusQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1 && state.cart[index].quantity >= 1) {
        state.cart[index].quantity -= 1;
      }
      if (state.cart[index].quantity < 1) {
        state.cart.splice(index, 1);
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      state.cart.splice(index, 1);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
