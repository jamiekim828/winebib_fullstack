import { createSlice } from '@reduxjs/toolkit';
import { Wish } from '../../types/type';

type InitialState = {
    userWishlist: Wish;
}

const initialState: InitialState = {
    userWishlist: {
        userId: '',
        wishes: []
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {}
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;