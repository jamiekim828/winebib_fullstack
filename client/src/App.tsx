import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';

import './App.css'
import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar';
import WineList from './components/products/WineList';
import UserLogIn from './components/users/UserLogIn';
import HomePage from './pages/HomePage';
import WishList from './components/wishList/WishList';
import UserInformation from './components/users/UserInformation';
import Contact from './pages/Contact';
import About from './pages/About';
import Location from './pages/Location';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<UserLogIn />} />
        <Route path='/account' element={<UserInformation />} />
        <Route path='/all-wine' element={<WineList />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/cart' element={<Cart />} />
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
