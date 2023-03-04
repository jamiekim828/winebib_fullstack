import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import './WineDetail.css';
import { Wine } from '../../types/type';
import { AppDispatch, RootState } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart';
import { createWishlistByUserThunk } from '../../redux/thunks/wishlist';
import { useState } from 'react';

type Prop = {
  wine: Wine;
};

export default function WineDetail({ wine }: Prop) {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const [starClick, setStarClick] = useState<boolean>(false);
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
  };

  const wishHandler = (userId: string, productId: string, product: Wine, token: string) => {
    dispatch(createWishlistByUserThunk(userId, productId, product, token));
    setStarClick(!starClick);
  };

  return (
    <div className='wine-detail'>
      <div>
        <div className=' star'>
          {starClick === false ? (
            <StarBorderIcon
              sx={{
                marginTop: '.5rem',
                color: 'darkred',
                fontSize: '30px',
                cursor: 'pointer',
              }}
              onClick={() => wishHandler(user._id, wine._id, wine, token)}
            />
          ) : (
            <StarIcon
              sx={{
                marginTop: '.5rem',
                color: 'darkred',
                fontSize: '30px',
                cursor: 'pointer',
              }}
              onClick={() => wishHandler(user._id, wine._id, wine, token)}
            />
          )}

          <p className='wine-name'>{wine.name}</p>
        </div>
        <div className='wine-img-div'>
          <Link to={`/wine/${wine._id}`}>
            <img
              src={`${wine.image}`}
              alt={`${wine.name}`}
              className='wine-img'
            />
          </Link>
          <div className='add-cart'>
            <Fab
              size='small'
              sx={{ backgroundColor: '#7f0000' }}
              aria-label='add'
            >
              <AddIcon
                onClick={() => addToCart(wine)}
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
          {wine.region}, {wine.country}
        </p>
      </div>
      <div className='wine-price'>
        <p>${wine.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
