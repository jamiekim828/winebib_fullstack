import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import WineBarIcon from '@mui/icons-material/WineBar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import { AppDispatch, RootState } from '../../redux/store';
import { getWishlistByUserThunk } from '../../redux/thunks/wishlist';
import { wishlistActions } from '../../redux/slices/wishlist';
import { wineActions } from '../../redux/slices/wine';

type Prop = {
  userTok: string | null;
};

export default function NavBar({ userTok }: Prop) {
  const [state, setState] = React.useState(false);
  const loginUser = useSelector((state: RootState) => state.user.loginUser);
  const cartList = useSelector((state: RootState) => state.cart.cart);
  const [userToken, setUserToken] = React.useState<string | null>(null);
  const loginSuccess = useSelector(
    (state: RootState) => state.user.loginSuccess
  );
  const cartQuantity = cartList.map((cart) => cart.quantity);
  const cartTotal = cartQuantity.reduce((a: number, b: number) => a + b, 0);
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.userWishlist[0].wishes
  );

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    setUserToken(userTok);
    // dispatch(wishlistActions.getWishlistByUserId(loginUser._id))
    if (!userToken) {
      return;
    }
    dispatch(getWishlistByUserThunk(loginUser._id, userToken));
  }, []);

  const list = () => (
    <Box
      sx={{ auto: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['All-Wine', 'Red', 'White', 'Sparkling'].map((text) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/${text.toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#b71c1c' }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {<WineBarIcon sx={{ color: '#b71c1c' }} />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => {
                    dispatch(wineActions.filterWine(text));
                    console.log(text);
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About', 'Contact', 'Location'].map((text) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/${text.toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#b71c1c' }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {<WineBarIcon sx={{ color: '#b71c1c' }} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '37px',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
        }}
      >
        <Link
          to='/'
          style={{
            fontFamily: 'Rampart One',
            fontSize: '37px',
            marginLeft: '2rem',
            textDecoration: 'none',
            color: '#b71c1c',
            fontWeight: '800',
          }}
        >
          WineBieb.
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to={loginSuccess === true ? '/account' : '/login'}>
            <Badge
              color={loginSuccess === true ? 'info' : 'error'}
              badgeContent={loginSuccess === true ? '✔' : 'x'}
              sx={{ marginRight: '1.2rem', fontWeight: '900', color: 'white' }}
            >
              <PersonOutlineIcon
                sx={{
                  cursor: 'pointer',
                  fontSize: '31px',
                  color: '#b71c1c',
                }}
              />
            </Badge>
          </Link>
          <Link to='/wishlist'>
            <Badge
              badgeContent={wishlist.length}
              color='info'
              sx={{ marginRight: '1.2rem', fontWeight: '900', color: 'white' }}
            >
              <StarBorderIcon
                sx={{
                  cursor: 'pointer',
                  fontSize: '31px',
                  color: '#b71c1c',
                }}
              />
            </Badge>
          </Link>
          <Link to='/cart'>
            <Badge badgeContent={cartTotal} color='info'>
              <ShoppingCartIcon
                sx={{
                  marginRight: '.5rem',
                  cursor: 'pointer',
                  fontSize: '31px',
                  color: '#b71c1c',
                }}
              />
            </Badge>
          </Link>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: '#b71c1c', fontSize: '31px' }} />
          </Button>
        </div>
      </div>
      <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
