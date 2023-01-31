import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarInfo from './components/NavbarInfo';
import NavbarMain from './components/NavbarMain';
import Search from './components/Search';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Contactpage from './pages/Contactpage';
import Shoppage from './pages/Shoppage';
import LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="app">
      <Router>
        <NavbarInfo />
        <NavbarMain />
        <Search />
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/shop' element={<Shoppage />}></Route>
          <Route path='/about' element={<Aboutpage />}></Route>
          <Route path='/contact' element={<Contactpage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
