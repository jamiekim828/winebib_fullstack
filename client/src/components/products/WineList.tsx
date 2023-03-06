import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AppDispatch, RootState } from '../../redux/store';
import { getAllWines } from '../../redux/thunks/wine';
import WineDetail from './WineDetail';
import { getWishlistByUserThunk } from '../../redux/thunks/wishlist';

export default function WineList() {
  const colWidth = { xs: 12, sm: 6, md: 4, lg: 3 };
  const wineList = useSelector((state: RootState) => state.wine.wine);
  const wishlist = useSelector((state: RootState) => state.wishlist.userWishlist)
  const wishMessage = useSelector((state:RootState)=> state.wishlist.wishMessage)
  const user = useSelector((state:RootState)=> state.user.loginUser)
  const token = localStorage.getItem('userToken') as string;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllWines());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getWishlistByUserThunk(user._id, token));
  }, [wishlist])

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

  return (<Box sx={{ flexGrow: 1, p: 2 }}>
    <h1>All wines list</h1>
    <Grid
      container
      spacing={2}
      sx={(theme) => ({
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
            {},
          ),
        },
      })}
    >
      
      {wineList.map((wine, index) => (
        <Grid key={index} {...colWidth} minHeight={200} >
          <WineDetail wine={wine} wishlist={wishlist} handleClick={handleClick}/>
        </Grid>
        
      ))}
    </Grid>
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={wishMessage}
        action={action}
      />
  </Box>)
}
