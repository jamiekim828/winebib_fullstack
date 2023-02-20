import { configureStore } from '@reduxjs/toolkit';

import wineReducer from './slices/wine';

const store = configureStore({
  reducer: { wine: wineReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
