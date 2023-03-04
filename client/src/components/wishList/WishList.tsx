import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';

import { AppDispatch, RootState } from '../../redux/store';
import { getWishlistByUserThunk } from '../../redux/thunks/wishlist';
import './WishList.css';
import WishListItem from './WishListItem';

export default function WishList() {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const token = localStorage.getItem('userToken') as string;
  const userWishData = useSelector(
    (state: RootState) => state.wishlist.userWishlist
  );
  const wishlist = userWishData[0].wishes;
  console.log(userWishData, wishlist, 'component');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getWishlistByUserThunk(user._id, token));
  }, [dispatch, user]);

  const colWidth = { xs: 12, sm: 6, md: 4, lg: 3 };

  return (
    <div className='wishlist-container'>
      <div className='wishlist-title'>
        <h1>My Wishlist</h1>
      </div>
      <div className='wishlist-div'>
        {wishlist.length === 0 ? (
          <div className='empty'>
            <div className='link-login'>
              <div className='icon-login'>
                <StarBorderIcon sx={{ marginRight: '.2rem' }} />
                <Link
                  to='/login'
                  style={{
                    color: 'darkred',
                    fontSize: '18px',
                    fontWeight: '900',
                  }}
                >
                  Login/Register
                </Link>
              </div>
              <h4>
                to store products in your account and view them from anywhere
              </h4>
            </div>
            <SavedSearchIcon sx={{ fontSize: '80px', color: 'grey' }} />
            <h2 style={{ color: 'grey' }}>Your wishlist is currently empty.</h2>
            <p>Save your wishes and we will save them for you.</p>
            <Link to='/all-wine' style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: 'darkred',
                  backgroundColor: 'white',
                  marginTop: '2rem',
                  ':hover': {
                    backgroundColor: 'darkred',
                    color: 'white',
                  },
                }}
              >
                Go Shopping
              </Button>
            </Link>
          </div>
        ) : (
          wishlist.map((wish, index) => (
            <Grid key={index} {...colWidth} minHeight={200}>
              <WishListItem wish={wish} />
            </Grid>
          ))
        )}
      </div>
    </div>
  );
}
