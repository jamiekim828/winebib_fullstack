//  product slice here
import { createSlice } from '@reduxjs/toolkit';

import { Wine } from '../../types/type';

type InitialState = {
  wine: Wine[];
  oneWine: Wine;
};

const initialState: InitialState = {
  wine: [],
  oneWine: {
    accidity: 0,
    capacity: 0,
    color: '',
    country: '',
    flag: '',
    grape: [],
    image: '',
    name: '',
    pairing: [],
    price: 0,    
    region: '',
    sweet: 0,    
    use: [],
    _id: '',
  }
};

const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    getWienList: (state, action) => {
      state.wine = action.payload;
    },
    getOneWine: (state, action) => {
      state.oneWine = action.payload;
    }
  },
});

export const wineActions = wineSlice.actions;
export default wineSlice.reducer;
