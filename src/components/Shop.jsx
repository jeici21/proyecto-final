import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/K-Market-2.png";
import Context from "../../src/redux/controlUsuario/Context";
import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

const Shop = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
        setState({ ...state, data: response.data });
      })
      .catch((e) => {
        localStorage.clear();
        navigate("/shop");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const array = data.roles;
  if (array) {
    localStorage.setItem("rolUser", JSON.stringify(array[0].roleCode));
    //console.log("Inicio de Session"+state[0].roleCode);
  } else {
    console.log("Cerrado y sin datos desde nav");
  }

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
  useEffect(() => {
    makeAPICall();
  }, []);

  const makeAPICall = async () => {
    try {
      //https://api.escuelajs.co/api/v1/products
      //http://localhost:8080/product
      axios.get(
        "http://localhost:8080/product" // , { mode: 'no-cors' // 'cors' by default}
      ).then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="main_container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      ) : (
        <section className="our-publication pt-50 pb-50">
          <div className="container">
            <div className="section-header">
              {/* <i className="fa fa-cart-arrow-down" /> */}
              <h2>Productos <img src={logo} alt="KMarket" className="logo-shop" /></h2>
              <p>Aquí podrá revisar nuestro catálogo de productos.</p>
            </div>
            <div className="row">
              {products.map((result) => {
                return (
                  <div className="floating col-sm-6 col-lg-3" key={result.id}>
                    <div className="single-publication">
                      <figure>
                        <a href="#" className="product-image">
                          <img src={result.img} alt="Publication" />
                        </a>
                        <ul>
                          <li>
                            <a href="#" title="Añadir a Favoritos">
                              <i className="fa fa-heart" />
                            </a>
                          </li>
                          <li>
                            <NavLink to={`/details/id:${result.id}`} title="Vistazo Rápido">
                              <i className="fa fa-search" />
                            </NavLink>
                          </li>
                        </ul>
                      </figure>
                      <div className="publication-content">
                        <span className="category">Productos</span>
                        <h3>
                          <a href="#">{result.name}</a>
                        </h3>
                        <ul>
                          <li>
                            <i className="icofont-star" />
                          </li>
                          <li>
                            <i className="icofont-star" />
                          </li>
                          <li>
                            <i className="icofont-star" />
                          </li>
                          <li>
                            <i className="icofont-star" />
                          </li>
                          <li>
                            <i className="icofont-star" />
                          </li>
                        </ul>
                        <h4 className="price">${result.price}</h4>
                      </div>
                      <div className="add-to-cart">
                        <button className="default-btn" onClick={() => onAddToCart(result)}>
                          Añadir al Carro
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )};
    </div>
  );
};
export default Shop;
