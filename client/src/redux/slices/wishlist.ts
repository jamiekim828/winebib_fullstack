import { createSlice } from '@reduxjs/toolkit';
import { Wish } from '../../types/type';

type InitialState = {
    userWishlist: Wish[];
    wishMessage: string;
}

const initialState: InitialState = {
    userWishlist: [{
        userId: '',
        wishes: []
    }],
    wishMessage: ''
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        getWishlistByUserId: (state, action) => {
            state.userWishlist = action.payload
        },
        removeWishlist: (state, action) => {
            state.userWishlist[0].wishes = action.payload
        },
        deleteWishlistItem: (state, action) => {
            state.userWishlist.push(action.payload)
        },
        getWishMessage: (state, action) => {
            state.wishMessage = action.payload
        }

    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;