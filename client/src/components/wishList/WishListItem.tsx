import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../redux/slices/cart';
import { Wine } from '../../types/type';
import { AppDispatch } from '../../redux/store';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Prop = {
  wish: Wine;
};

export default function WishListItem({ wish }: Prop) {
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
  console.log(wish);
  return (
    <div>
      <div>
        <div className=' star'>
          <StarBorderIcon
            sx={{
              marginTop: '.5rem',
              color: 'darkred',
              fontSize: '30px',
              cursor: 'pointer',
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
            />
          </Link>
          <div className='add-cart'>
            <Fab
              size='small'
              sx={{ backgroundColor: '#7f0000' }}
              aria-label='add'
            >
              <AddIcon
                onClick={() => addToCart(wish)}
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
