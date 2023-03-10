import { configureStore } from '@reduxjs/toolkit';

import wineReducer from './slices/wine';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import orderReducer from './slices/order'
import wishlistReducer from './slices/wishlist'

const store = configureStore({
  reducer: {
    wine: wineReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
