import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import { AppDispatch, RootState } from '../../redux/store';
import { getWishlistByUserThunk } from '../../redux/thunks/wishlist';
import './WishList.css';
import WishListItem from './WishListItem';

export default function WishList() {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const wishMessage = useSelector(
    (state: RootState) => state.wishlist.wishMessage
  );
  const token = localStorage.getItem('userToken') as string;
  const userWishData = useSelector(
    (state: RootState) => state.wishlist.userWishlist
  );
  const wishlist = userWishData[0].wishes;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getWishlistByUserThunk(user._id, token));
  }, [dispatch, user, wishlist, token]);

  const colWidth = { xs: 12, sm: 6, md: 4, lg: 3 };

  // MUI snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div className='wishlist-container'>
      <div className='wishlist-title'>
        <h1>My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className='wishlist-div'>
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
        </div>
      ) : (
        <Grid
          container
          spacing={2}
          sx={(theme) => ({
            marginRight: '2rem',
            marginBottom: '5rem',
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderColor: 'darkred',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'darkred',
              ...Object.keys(colWidth).reduce(
                (result, key) => ({
                  ...result,
                  [`&:nth-of-type(${12 / 4}n)`]: {
                    [theme.breakpoints.only('md')]: {
                      borderRight: 'none',
                    },
                  },
                }),
                {}
              ),
            },
          })}
        >
          {wishlist.map((wish, index) => (
            <Grid key={index} {...colWidth} minHeight={200}>
              <WishListItem
                wish={wish}
                handleClick={handleClick}
              />
            </Grid>
          ))}
          <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={wishMessage}
        action={action}
      />
        </Grid>
      )}
    </div>
  );
}
