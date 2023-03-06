import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './ProductDescription.css';
import { AppDispatch, RootState } from '../../redux/store';
import { getOneWineThunk } from '../../redux/thunks/wine';
import { Wine } from '../../types/type';
import { cartActions } from '../../redux/slices/cart';
import { createWishlistByUserThunk } from '../../redux/thunks/wishlist';
import { wishlistActions } from '../../redux/slices/wishlist';

export function ProductDescription() {
  const wine = useSelector((state: RootState) => state.wine.oneWine);
  const id = useParams().id as string;
  const user = useSelector((state: RootState) => state.user.loginUser);
  const token = localStorage.getItem('userToken') as string;
  const wishMessage = useSelector(
    (state: RootState) => state.wishlist.wishMessage
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOneWineThunk(id));
  }, [dispatch, id]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' href='/'>
      HOME
    </Link>,
    <Link underline='hover' key='2' color='inherit' href='/all-wine'>
      ALL WINE
    </Link>,
    <Typography key='3' color='text.primary'>
      {wine.name}
    </Typography>,
  ];

  const addWishHandler = (
    userId: string,
    productId: string,
    product: Wine,
    token: string
  ) => {
    dispatch(createWishlistByUserThunk(userId, productId, product, token));
  };

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
    dispatch(wishlistActions.getWishMessage('Product is added to the cart.'));
    handleClick();
  };

  return (
    <div className='description-div'>
      <Breadcrumbs
        separator='›'
        aria-label='breadcrumb'
        sx={{ marginBottom: '2rem' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <div className='flex'>
        <div className='description-img'>
          <img src={`${wine.image}`} alt={`${wine.name}`} />
        </div>
        <div className='description-detail'>
          <h1>{wine.name}</h1>
          <div className='flex flag-div'>
            <img
              className='flag'
              src={`${wine.flag}`}
              alt={`${wine.country}`}
            />
            <p>
              {wine.region}, {wine.country}
            </p>
          </div>
          <div className='flex'>
            {wine.grape.map((p, index) => (
              <p key={index}>
                {p} {index < wine.grape.length - 1 ? ', ' : ''}
              </p>
            ))}
          </div>
          <div>
            <p>
              {wine.color}&nbsp;wine&nbsp;{wine.capacity}ml
            </p>
          </div>
          <div className='flex'>
            <p>Usage&nbsp;:&nbsp;</p>
            {wine.use.map((u, index) => (
              <p key={index}>
                {u} {index < wine.use.length - 1 ? ', ' : ''}
              </p>
            ))}
          </div>
          <div className='flex'>
            <p>Good with&nbsp;:&nbsp;</p>
            {wine.pairing.map((p, index) => (
              <p key={index}>
                {p} {index < wine.pairing.length - 1 ? ', ' : ''}
              </p>
            ))}
          </div>
          <div className='flex'>
            <p style={{ width: '70px' }}>acidity</p>
            <Rating name='read-only' value={wine.accidity} readOnly />
          </div>
          <div className='flex'>
            <p style={{ width: '70px' }}>sweet</p>
            <Rating name='read-only' value={wine.sweet} readOnly />
          </div>
          <div>
            <p>Price : ${wine.price.toFixed(2)}</p>
          </div>

          <button
            className='wish-btn'
            onClick={() => {
              addWishHandler(user._id, id, wine, token);
              setOpen(true);
              handleClick();
            }}
          >
            Wishlist
          </button>
          <button className='add-btn' onClick={() => addToCart(wine)}>
            Add to cart
          </button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={wishMessage}
            action={action}
          />
        </div>
      </div>
    </div>
  );
}
