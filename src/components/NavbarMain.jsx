import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/K-Market-2.png";
import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";
import Context from "../../src/redux/controlUsuario/Context";

const NavbarMain = () => {
  const { state, setState } = useContext(Context);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [item, setItem] = useState(JSON.parse(localStorage.getItem('itemscart')) || 0);
  //const [linkImage, setlinkImage] = useState("");
  console.log(item);
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
        setState({ ...state, data: response.data });
      })
      .catch((e) => {
        localStorage.clear();
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let firstName;
  let lastName;
  if (state && state.data) {
    firstName = state.data.firstName;
    lastName = state.data.lastName;
  }

  const logOut = () => {
    localStorage.clear();
    setState("cerrado Sesion");
    navigate("/");
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const rolUser = localStorage.getItem("rolUser");

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
  <div className="container d-flex justify-content-between align-items-center">
    <NavLink to="/" exact="true" className="navbar-brand text-success h1 align-self-center">
      <img src={logo} alt="KMarket" className="logo" />
    </NavLink>
    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
      data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="align-self-center collapse navbar-collapse flex-fill justify-content-between"
      id="templatemo_main_nav">
      <div className="flex-fill">
        <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
          <li className="nav-item">
            <NavLink to="/" activeclassname="active" exact="true" className="nav-link">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop" activeclassname="active" exact="true" className="nav-link">Tienda</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" activeclassname="active" exact="true" className="nav-link">Acerca de</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" activeclassname="active" exact="true" className="nav-link">Contacto</NavLink>
          </li>
          <li className="nav-item">
            {rolUser === '"ADMIN"' ? (
              <NavLink to="/crud" activeclassname="active" exact="true" className="nav-link">Gestión de productos</NavLink>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar align-self-center d-flex ">
        <div className="d-lg-none d-flex  mt-3 mb-4 col-7">
          <div className="input-group ">
            <input type="text" className=" form-control" id="inputMobileSearch" placeholder="Buscar..." />
            <div className="input-group-text"><i className="fa fa-fw fa-search" /></div>
          </div>
        </div>
        <div>
        <a className="nav-icon d-inline    position-relative text-decoration-none" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
          <i className="fa fa-fw fa-search text-dark mr-2" />
        </a>
          </div>
        <div className="d-flex">
          <NavLink className="nav-icon position-relative text-decoration-none" to="/cart">
            <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                {item}
              </span>
            </NavLink>
            </div>       
            {currentUser ? (
              <div className="flex-shrink-0 dropdown">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img src="https://electronicssoftware.net/wp-content/uploads/user.png" alt="mdo" width="32" height="32"
                    className="rounded-circle" />
                </a>
                {currentUser ? (
                  <ul className="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="#">{firstName && `${firstName} ${lastName}`}</a></li>
                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={() => logOut()}>Cerrar Sessión</a></li>
                  </ul>
                ) : (
                  <ul className="dropdown-menu text-small shadow">
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <NavLink to="/login" className="nav-icon position-relative text-decoration-none">Iniciar Sessión</NavLink>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="mt-3"><NavLink to="/login" className="btn-success btn-login btn btn-outline-primary me-2">Iniciar Sesión</NavLink></div>
              )}
          </div>
             
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
