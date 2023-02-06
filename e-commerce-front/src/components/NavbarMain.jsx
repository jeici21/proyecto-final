import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/K-Market-2.png";
import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";

const NavbarMain = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [linkImage, setlinkImage] = useState("");

  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        localStorage.clear();
        navigate("/");
      });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
 /* pROBANDO CONTROL Image

  if (data.firstName) {
    setlinkImage("https://avatars.githubusercontent.com/u/35409654?s=40&v=4");
  } else {
    setlinkImage("https://i.stack.imgur.com/l60Hf.png");
  }
*/
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink
          to="/"
          activeClassName="active"
          exact
          className="navbar-brand text-success h1 align-self-center"
          href="/"
        >
          <img src={logo} alt="KMarket" className="logo" />
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
          id="templatemo_main_nav"
        >
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  activeClassName="active"
                  exact
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  activeClassName="active"
                  exact
                  className="nav-link"
                >
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  activeClassName="active"
                  exact
                  className="nav-link"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  activeClassName="active"
                  exact
                  className="nav-link"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex">
            <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputMobileSearch"
                  placeholder="Search ..."
                />
                <div className="input-group-text">
                  <i className="fa fa-fw fa-search"></i>
                </div>
              </div>
            </div>
            <a
              className="nav-icon d-none d-lg-inline"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#templatemo_search"
            >
              <i className="fa fa-fw fa-search text-dark mr-2"></i>
            </a>
            <a
              className="nav-icon position-relative text-decoration-none"
              href="#"
            >
              <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                7
              </span>
            </a>
            <NavLink
              to="/login"
              activeClassName="active"
              className="nav-icon position-relative text-decoration-none"
            >
              <i className="fa fa-fw fa-user text-dark mr-3"></i>
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                +99
              </span>
            </NavLink>

            <div class="flex-shrink-0 dropdown">
              <a
                href="#"
                class="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/35409654?s=40&v=4"
                  alt="mdo"
                  width="32"
                  height="32"
                  class="rounded-circle"
                />
              </a>
              <ul class="dropdown-menu text-small shadow">
                <li>
                  <a class="dropdown-item" href="#">
                  {data && `${data.firstName} ${data.lastName}`}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#" onClick={() => logOut()}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
