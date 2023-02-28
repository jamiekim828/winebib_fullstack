import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import './CheckOut.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart';
import { UserData } from '../../types/type';
import { orderActions } from '../../redux/slices/order';

type FormInput = {
  userName: String;
  street: String;
  houseNumber: String;
  zip: String;
  city: String;
  country: String;
};

export default function CheckOut() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();
  const dispatch = useDispatch<AppDispatch>();

  const [cart, setCart] = useState<
    {
      productId: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  const [loginUser, setLoginUSer] = useState<UserData>({
    _id: '',
    userName: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') as string));
    setLoginUSer(JSON.parse(localStorage.getItem('loginUser') as string));
  }, []);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (loginUser) {
      const newOrder = {
        userId: loginUser._id,
        address: [data],
        orders: cart,
        total: cart
          .map((item) => item.price * item.quantity)
          .reduce((a, b) => a + b),
      };
      dispatch(cartActions.getShippingAddress(data));
      dispatch(cartActions.getCart(cart));
      dispatch(orderActions.orderByUser(newOrder));

      navigate('/proceed');
    }
    if (!loginUser) {
      //please login to proceed
      navigate('/login');
    }
  };

  const subPrice = cart.map((c) => c.quantity * c.price);
  const subTotal = subPrice.reduce((a: number, b: number) => a + b, 0);

  return (
    <div className='checkout-container'>
      <div className='checkout-title'>
        <h1>Checkout</h1>
        <Link to='/all-wine' className='continue'>
          <p>Continue Shopping</p>
        </Link>
      </div>
      <div className='checkout-div'>
        <div className='shipping-div'>
          <h2>Shipping Details</h2>
          <div className='ship-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>User name</label>
              <input {...register('userName')} />
              <label>Street *</label>
              <input {...register('street', { required: true })} />
              {errors.street && 'Street name is required'}
              <label>House number *</label>
              <input {...register('houseNumber', { required: true })} />
              {errors.houseNumber && 'House number is required'}
              <label>Zip code *</label>
              <input {...register('zip', { required: true })} />
              {errors.zip && 'Please enter the zip code'}
              <label>City *</label>
              <input {...register('city', { required: true })} />
              {errors.city && 'City name is required'}
              <label>Country *</label>
              <input {...register('country', { required: true })} />
              {errors.country && 'Country name is required'}
              <button type='submit' className='ship-form-btn'>
                Proceed to checkout
              </button>
            </form>
          </div>
        </div>
        <div>
          <h2>Your Order</h2>
          <div>
            {cart.map((c, index) => (
              <div key={index}>
                <p>
                  {c.name} x {c.quantity}
                </p>
                <p>${c.quantity * c.price}</p>
              </div>
            ))}
            <div className='flex'>
              <p>Subtotal</p>
              <h4 className='checkout-total'>$ {subTotal}</h4>
            </div>
            <div className='flex'>
              <p>Shipping</p>
              <h4 className='checkout-total'>FREE</h4>
            </div>
            <div className='flex'>
              <p>Total</p>
              <h4 className='checkout-total'>$ {subTotal}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
