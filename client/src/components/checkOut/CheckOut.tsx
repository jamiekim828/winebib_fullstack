import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './CheckOut.css';

export default function CheckOut() {
  const [cart, setCart] = useState<
    {
      productId: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') as string))
  }, []);


  const subPrice = cart.map(c=> c.quantity * c.price)
  const subTotal = subPrice.reduce((a: number, b: number) => a + b, 0)

  return (
    <div className='checkout-container'>
      <div className='checkout-title'>
        <h1>Chechout</h1>
        <Link to='/all-wine' className='continue'>
          <p>Continue Shopping</p>
        </Link>
      </div>
      <div className='checkout-div'>
        <div className='shipping-div'>
          <h2>Shipping Details</h2>
        </div>
        <div>
          <h2>Your Order</h2>
          <div>
            {cart.map(c=> <div><p>{c.name} x {c.quantity}</p><p>${c.quantity * c.price}</p></div>)}
            <div><p>Subtotal</p><p>${subTotal}</p> </div>
            <div><p>Shipping</p><p>FREE</p></div>
            <div><p>Total</p><p>${subTotal}</p></div>
          </div>
          <div><button>PLACE ORDER</button></div>
        </div>
      </div>
    </div>
  );
}
