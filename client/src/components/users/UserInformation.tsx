import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './UserInformation.css';
import EditUser from '../editUser/EditUser';
import { AppDispatch, RootState } from '../../redux/store';
import { getOrderHistoryByUserData } from '../../redux/thunks/cart';
import { userActions } from '../../redux/slices/user';
import { logoutUser } from '../../redux/thunks/user';
import { cartActions } from '../../redux/slices/cart';

function createData(
  orderId: string,
  date: string,
  products: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[],
  total: number,
  shipping: string,
  status: string
) {
  return { orderId, date, products, total, shipping, status };
}

export default function UserInformation() {
  const user = useSelector((state: RootState) => state.user.loginUser);
  const orderHistory = useSelector(
    (state: RootState) => state.cart.orderHistoryByUser
  );
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const token = localStorage.getItem('userToken');

  const edit = () => {
    setEditOpen(!editOpen);
  };

  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logoutUser())
    dispatch(cartActions.removeOrderHistory([]))
    navigate('/');
  };

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('loginUser') || '{}');
    dispatch(userActions.getLoginUser(userInfo))
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderHistoryByUserData(user._id, token));
  }, []);

  const rows = orderHistory.map((order) =>
    createData(
      order._id,
      order.date,
      order.orders,
      order.total,
      order.address,
      order.isDelivered
    )
  );

  return (
    <div>
      <div className='user-div'>
        {user.email === '' ? (
          <p className='user-empty'>Please log in.</p>
        ) : (
          <div className='my-account-div'>
            <div className='account'>
              <h1>My account</h1>
              <p className='info'>name: {user.userName}</p>
              <p className='info'>email: {user.email}</p>
              <div className='userinfo-buttons'>
                <button className='logout-btn' onClick={logOut}>
                  LOG OUT
                </button>
                <button className='edit-btn' onClick={edit}>
                  {!editOpen ? 'EDIT INFO' : 'CANCEL'}
                </button>
                <div>
                  {editOpen === true && (
                    <EditUser user={user} setEditOpen={setEditOpen} />
                  )}
                </div>
              </div>
            </div>
            <div className='history'>
              <h1>My history</h1>
              <h3>Order history</h3>
              <div>
                <TableContainer component={Paper} sx={{ width: 800 }}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size='small'
                    aria-label='a dense table'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align='right'>Date</TableCell>
                        <TableCell align='right'>Products</TableCell>
                        <TableCell align='right'>Total</TableCell>
                        <TableCell align='right'>Address</TableCell>
                        <TableCell align='right'>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.orderId}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {row.orderId.slice(12, 26)}
                          </TableCell>
                          <TableCell align='left'>
                            {new Date(row.date).toISOString().slice(0, 10)}
                          </TableCell>
                          <TableCell align='left'>
                            {row.products.map((order) => (
                              <div className='history-products'>
                                <img
                                  src={`${order.image}`}
                                  alt={`${order.name}`}
                                />
                                <p className='history-product-name'>
                                  {order.name}
                                </p>
                                <p>
                                  {order.price} x {order.quantity}
                                </p>
                              </div>
                            ))}
                          </TableCell>
                          <TableCell align='left'>$ {row.total}</TableCell>
                          <TableCell align='right'>{row.shipping}</TableCell>
                          <TableCell align='right'>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
