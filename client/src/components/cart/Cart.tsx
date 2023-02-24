import { useDispatch, useSelector } from 'react-redux';

import './Cart.css';
import { AppDispatch, RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { cartActions } from '../../redux/slices/cart';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartPrice = cart.map((item) => item.price * item.quantity);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='cart-div'>
      <div className='cart-div-title'>
        <h1>Shopping Cart</h1>
        <Link to='/all-wine' className='continue'>
          <p>Continue Shopping</p>
        </Link>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
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
              <button className='check-out'>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
