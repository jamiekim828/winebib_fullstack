import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar';
import WineList from './components/products/WineList';
import UserLogIn from './components/users/UserLogIn';
import HomePage from './pages/HomePage';
import WishList from './components/wishList/WishList';
import UserInformation from './components/users/UserInformation';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './components/cart/Cart';
import Location from './pages/Location';
import { ProductDescription } from './components/productDescription/ProductDescription';
import CheckOut from './components/checkOut/CheckOut';
import Proceed from './components/proceed/Proceed';
import { AppDispatch, RootState } from './redux/store';
import { getWishlistByUserThunk } from './redux/thunks/wishlist';

function App() {
  const token = localStorage.getItem('userToken') as string;
  const user = useSelector((state: RootState) => state.user.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getWishlistByUserThunk(user._id, token));
  }, [user]);

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar userTok={token} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<UserLogIn />} />
          <Route path='/account' element={<UserInformation />} />
          <Route path='/all-wine' element={<WineList />} />
          <Route path='/wine/:id' element={<ProductDescription />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/check-out' element={<CheckOut />} />
          <Route path='/proceed' element={<Proceed />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/location' element={<Location />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
