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
//import Shoppage from './pages/Shoppage';
import LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/dashboard';
import React, { useState } from "react";
import Crud from './components/Crud';
//import TableCateory from './components/TableCategory';
//import Cart from './components/Cart'; 
import Shop from './components/Shop';
import ShoppingCart from './components/ShoppingCart';
import Context from '../src/redux/controlUsuario/Context';
import PageDetails from './components/PageDetails';
function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('product')) || []);

  const handleAddToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      let existingProducts = JSON.parse(localStorage.getItem("product")) || [];
      existingProducts.push(product);
      setCart(existingProducts);
      localStorage.setItem("product", JSON.stringify(existingProducts));
      localStorage.setItem("itemscart", JSON.stringify(existingProducts.length));
      //window.alert(`${product.name} was added to the cart`);
    } else {
      //window.alert(`${product.name} is already in the cart`);
    }

    console.log(" cart: " + cart);
  };


  function handleRemoveFromCart(productToRemove) {

    let existingProducts = JSON.parse(localStorage.getItem("product")) || [];
    let updatedProducts = existingProducts.filter((p) => p.id !== productToRemove.id);
    setCart(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    localStorage.setItem("itemscart", JSON.stringify(updatedProducts.length));
  }
  const Provider = ({ children }) => {
    const [state, setState] = React.useState({});


    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    );
  };

  return (
    <div className="app">
      <Provider>
        <BrowserRouter>
          <NavbarInfo />
          <NavbarMain />
          <Search />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/shop' element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<ShoppingCart items={cart} onRemoveToCart={handleRemoveFromCart} />} />
            <Route path='/about' element={<Aboutpage />} />
            <Route path='/contact' element={<Contactpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crud" element={<Crud />} />

            <Route path="/details/:id" element={<PageDetails onAddToCart={handleAddToCart} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
