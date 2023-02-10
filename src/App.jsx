import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarInfo from './components/NavbarInfo';
import NavbarMain from './components/NavbarMain';
import Search from './components/Search';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Contactpage from './pages/Contactpage';
import Shoppage from './pages/Shoppage';
import LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/dashboard';
import React, {useState } from "react";
import Crud from './components/Crud';
import TableCateory from './components/TableCategory';
import Cart from './components/Cart'; 
import Shop from './components/Shop';
import ShoppingCart from './components/ShoppingCart';
function App() {

    const [cart, setCart] = useState([]);
  
    const handleAddToCart = (product) => {
      setCart([...cart, product]);
      console.log(cart);
    };
  return (
    <div className="app">
      <BrowserRouter>
        <NavbarInfo />
        <NavbarMain />
        <Search />
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/shop' element={<Shop onAddToCart={handleAddToCart}/>}></Route>
          <Route path="/cart" element={<ShoppingCart items={cart}/>} />
          <Route path='/about' element={<Aboutpage />}></Route>
          <Route path='/contact' element={<Contactpage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
