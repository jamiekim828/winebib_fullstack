import { configureStore } from '@reduxjs/toolkit';

import wineReducer from './slices/wine';
import userReducer from './slices/user'

const store = configureStore({
  reducer: {
    wine: wineReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
