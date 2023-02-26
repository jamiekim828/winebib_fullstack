import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  cart: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: string;
  payment: string;
};

const initialState: InitialState = {
  cart: [],
  shippingAddress: '',
  payment: ''
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
