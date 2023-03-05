import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { cartActions } from '../../redux/slices/cart';
import { Wine } from '../../types/type';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteWishByProductId } from '../../redux/thunks/wishlist';
import { wishlistActions } from '../../redux/slices/wishlist';

type Prop = {
  wish: Wine;
  handleClick: Function;
};

export default function WishListItem({ wish, handleClick }: Prop) {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const token = localStorage.getItem('userToken') as string;
  const dispatch = useDispatch<AppDispatch>();
  const addToCart = (product: Wine) => {
    dispatch(
      cartActions.addToCartAction({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
    dispatch(wishlistActions.getWishMessage('Product added to the cart.'));
  };
  const deleteHandler = (
    userId: string,
    productId: string,
    product: Wine,
    token: string
  ) => {
    dispatch(deleteWishByProductId(userId, productId, product, token));
  };

  return (
    <div style={{ marginLeft: '1rem' }}>
      <div>
        <div className=' star'>
          <ClearIcon
            sx={{
              marginTop: '.5rem',
              color: 'darkred',
              fontSize: '30px',
              cursor: 'pointer',
            }}
            onClick={() => {
              deleteHandler(user._id, wish._id, wish, token);
              handleClick();
            }}
          />
          <p className='wine-name'>{wish.name}</p>
        </div>
        <div className='wine-img-div'>
          <Link to={`/wine/${wish._id}`}>
            <img
              src={`${wish.image}`}
              alt={`${wish.name}`}
              className='wine-img'
              style={{ marginLeft: '2rem' }}
            />
          </Link>
          <div className='add-cart'>
            <Fab
              size='small'
              sx={{ backgroundColor: '#7f0000' }}
              aria-label='add'
            >
              <AddIcon
                onClick={() => {
                  addToCart(wish);
                  handleClick();
                  dispatch(
                    deleteWishByProductId(user._id, wish._id, wish, token)
                  );
                }}
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'darkred',
                  },
                }}
              />
            </Fab>
          </div>
        </div>
        <p>
          {wish.region}, {wish.country}
        </p>
      </div>
      <div className='wine-price'>
        <p>${wish.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
