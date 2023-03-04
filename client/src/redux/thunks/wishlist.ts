import axios from 'axios';

import { AppDispatch } from '../store';
import { wishlistActions } from '../slices/wishlist';
import { Wine } from '../../types/type';

const url = 'http://localhost:8000/wishlist';

export function getWishlistByUserThunk(userId: string, token: string) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get(`${url}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const wishlist = await response.data;

    dispatch(wishlistActions.getWishlistByUserId(wishlist));
  };
}

export function createWishlistByUserThunk(
  userId: string,
  productId: string,
  product: Wine,
  token: string
) {
  return async (dispatch: AppDispatch) => {
    console.log(userId, productId, token)
    const response = await axios.post(`${url}/${userId}/${productId}`,product, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data, 'thunk')
  };
}

export function deleteWishByProductId(
  userId: string,
  productId: string,
  token: string
) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.delete(`${url}/${userId}/${productId}`);
    console.log(response.data);
  };
}
