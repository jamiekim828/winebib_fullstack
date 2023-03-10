import { useDispatch, useSelector } from 'react-redux';

import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './Cart.css';
import { AppDispatch, RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { cartActions } from '../../redux/slices/cart';
import { useState } from 'react';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartPrice = cart.map((item) => item.price * item.quantity);
  const loginSuccess = useSelector(
    (state: RootState) => state.user.loginSuccess
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const checkOut = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (loginSuccess === true) {
      navigate('/check-out');
    }
    if (loginSuccess === false) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='cart-div'>
      <div className='cart-div-title'>
        <h1>Shopping Cart</h1>
        <Link to='/all-wine' className='continue'>
          <p>Continue Shopping</p>
        </Link>
      </div>
      {cart.length === 0 ? (
        <div className='empty'>
          <div className='link-login'>
            <div className='icon-login'>
              <RemoveShoppingCartIcon sx={{ marginRight: '.2rem' }} />
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
            <h4>to make an order.</h4>
          </div>
          <RemoveShoppingCartIcon sx={{ fontSize: '80px', color: 'grey' }} />
          <h2 style={{ color: 'grey' }}>Your cart is currently empty.</h2>
          <p>Register and login to get 20% off code.</p>
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
        <div className='cart'>
          <div className='cart-list'>
            <h2>PRODUCTS</h2>
            {cart.map((item) => (
              <div className='cart-map' key={item.productId}>
                <div className='cart-img-div'>
                  <Link to={`/wine/${item.productId}`}>
                    <img
                      src={`${item.image}`}
                      alt={`${item.name}`}
                      className='cart-img'
                    />
                  </Link>
                </div>
                <div className='cart-detail'>
                  <p>{item.name}</p>
                  <div className='cart-detail-price'>
                    <button
                      onClick={() => dispatch(cartActions.minusQuantity(item))}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        dispatch(cartActions.addToCartAction(item))
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className='item-price'>$ {item.price} USD</p>
                  <button
                    className='cart-remove'
                    onClick={() => dispatch(cartActions.removeFromCart(item))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='subtotal'>
            <h2>SUBTOTAL</h2>
            <div className='subtotal-detail'>
              <div>
                <p>Subtotal</p>
                <p>$ {cartPrice.reduce((a, b) => a + b)} USD</p>
              </div>
              <div>
                <p>Shipping</p>
                <p>FREE</p>
              </div>
              <div>
                <p>Total</p>
                <p>$ {cartPrice.reduce((a, b) => a + b)} USD</p>
              </div>
              <button className='check-out' onClick={checkOut}>
                Check Out
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {"Please login to make an order. "}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Don't have account? Please
                    register and get 20% off code!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleClose();
                      navigate('/login');
                    }}
                  >
                    Login/Register
                  </Button>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
