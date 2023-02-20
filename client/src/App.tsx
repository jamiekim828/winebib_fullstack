import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';

import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar';
import WineList from './components/products/WineList';
import UserLogIn from './components/users/UserLogIn';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<UserLogIn />} />
        <Route path='/wine' element={<WineList />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
