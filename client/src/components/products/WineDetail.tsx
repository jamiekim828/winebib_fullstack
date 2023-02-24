import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import './WineDetail.css';
import { Wine } from '../../types/type';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart';

type Prop = {
  wine: Wine;
};

export default function WineDetail({ wine }: Prop) {
  const dispatch = useDispatch<AppDispatch>()
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

  return (
    <div className='wine-detail'>
      <div>
        <p className='wine-name'>{wine.name}</p>
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
                onClick={()=>addToCart(wine)}
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
