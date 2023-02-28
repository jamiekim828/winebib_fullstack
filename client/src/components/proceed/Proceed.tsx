import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

import './Proceed.css';
import { createOrderByUserId } from '../../redux/thunks/order';
import { cartActions } from '../../redux/slices/cart';
import { useNavigate } from 'react-router-dom';

export default function Proceed() {
  const message = useSelector((state: RootState) => state.user.message);
  const [open, setOpen] = useState<boolean>(false);

  const loginSuccess = useSelector(
    (state: RootState) => state.user.loginSuccess
  );
  const [token, setToken] = useState<string | null>('');
  const userOrder = useSelector((state: RootState) => state.order.userOrder);

  useEffect(() => {
    setToken(localStorage.getItem('userToken'));
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const purchase = () => {
    dispatch(createOrderByUserId(userOrder.userId, token, userOrder));
    dispatch(cartActions.emptyCart([]));
    localStorage.removeItem('cart');
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <div className='payment-container'>
      <div className='payment-title'>
        <h1>Payment</h1>
      </div>
      <div className='order-pay-div'>
        <div className='your-order'>
          <h3>Please check your order</h3>
          <div>
            {loginSuccess === true && userOrder.address.length !== 0 ? (
              <div>
                <table>
                  <tr>
                    <th>Name:</th>
                    <td>{userOrder.address[0].userName}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>
                      {userOrder.address[0].houseNumber},
                      {userOrder.address[0].street}
                      <br /> {userOrder.address[0].city},
                      {userOrder.address[0].zip}
                      <br /> {userOrder.address[0].country}
                    </td>
                  </tr>
                  <tr>
                    <th>Products:</th>
                    <td>
                      {userOrder.orders.map(
                        (p: {
                          name: string;
                          price: number;
                          quantity: number;
                        }) => (
                          <p>
                            {p.name} (${p.price}) x {p.quantity}
                          </p>
                        )
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td>$ {userOrder.total}</td>
                  </tr>
                </table>
              </div>
            ) : (
              <h4>Please login to order.</h4>
            )}
          </div>
        </div>
        <div>
          <div className='payment-check-div'>
            <h3>Payment method</h3>
            <div className='radio-div'>
              <div>
                <input type='radio' name='radAnswer' />
                <img
                  src='https://upload.wikimedia.org/wikipedia/en/thumb/2/28/IDEAL_Logo_2020.svg/1200px-IDEAL_Logo_2020.svg.png'
                  alt='ideal'
                />
              </div>
              <div>
                <input type='radio' name='radAnswer' />
                <img
                  src='https://w7.pngwing.com/pngs/678/81/png-transparent-visa-and-master-cards-mastercard-money-foothills-florist-business-visa-visa-mastercard-text-service-orange.png'
                  alt='credit'
                />
              </div>
              <div>
                <input type='radio' name='radAnswer' />
                <img
                  src='https://www.pngarts.com/files/1/Dollar-PNG-Download-Image.png'
                  alt='cash'
                />
              </div>
              <button className='ship-form-btn' onClick={purchase}>
                BUY
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>Message</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
