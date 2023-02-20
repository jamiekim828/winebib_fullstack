//  product slice here
import { createSlice } from '@reduxjs/toolkit';

import { Wine } from '../../types/type';

type InitialState = {
  wine: Wine[];
};

const initialState: InitialState = {
  wine: [],
};

const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    getWienList: (state, action) => {
      state.wine = action.payload;
    },
  },
});

export const wineActions = wineSlice.actions;
export default wineSlice.reducer;
