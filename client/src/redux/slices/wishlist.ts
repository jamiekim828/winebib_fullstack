import { createSlice } from '@reduxjs/toolkit';
import { Wish } from '../../types/type';

type InitialState = {
    userWishlist: Wish[];
}

const initialState: InitialState = {
    userWishlist: [{
        userId: '',
        wishes: []
    }]
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        getWishlistByUserId: (state, action) => {
            console.log(action.payload, 'from wishliSlice')
            state.userWishlist = action.payload
        },
        removeWishlist: (state, action) => {
            state.userWishlist[0].wishes = action.payload
        },
        deleteWishlistItem: (state, action) => {
            state.userWishlist = action.payload
        }

    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;