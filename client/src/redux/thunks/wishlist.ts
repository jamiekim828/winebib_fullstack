import axios from 'axios'

import { AppDispatch } from '../store'
import {wishlistActions} from '../slices/wishlist'

const url = 'http://localhost:8000/wishlist'

export function getWishlistByUserThunk(userId:string) {
    return async (dispatch:AppDispatch) => {
        const response = await axios.get(`${url}/${userId}`)
        const wishlist = await response.data
        
        dispatch(wishlistActions.getWishlistByUserId(wishlist))
    }
}

export function deleteWishByProductId(userId:string, productId:string) {
    return async (dispatch:AppDispatch) => {
        const response = await axios.delete(`${url}/${userId}/${productId}`)
        console.log(response.data)
    }
}
