import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/K-Market-2.png";
import Context from "../../src/redux/controlUsuario/Context";
import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

const Shop = ({ onAddToCart }) => {


  const CategoryUrl = "http://localhost:8080/category";
  const [products, setProducts] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');

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
    peticionGetCategory();
  }, []);

  const makeAPICall = async () => {
    try {
      axios.get(
        "http://localhost:8080/product" // , { mode: 'no-cors' // 'cors' by default}
      ).then((res) => {
        setProducts(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const peticionGetCategory = async () => {
    await axios.get(CategoryUrl)
      .then(response => {
        setDataCategory(response.data);
      }).catch(error => {
        console.log(error);
      })
  }


  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const handleChangepage = (event) => {
    setDataPerPage(event.target.value);
    setCurrentPage(1);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // const filteredData = products.filter((item) => {
  //   
  //   return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.price.toString().includes(searchTerm.toLowerCase());
  // });

  const filteredData = products.filter((item) => {
    if (category !== 'all') {
      // Si se ha seleccionado una categoría específica, filtrar solo los productos de esa categoría
      if (searchTerm.trim() === '') {
        // Si el término de búsqueda está vacío, aplicar solo el filtro por categoría
        return item.productCategory.id === parseInt(category);
      } else {
        // Si hay un término de búsqueda, aplicar tanto el filtro por categoría como el filtro por término de búsqueda
        return (
          item.productCategory.id === parseInt(category) &&
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm.toLowerCase()))
        );
      }
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.price.toString().includes(searchTerm.toLowerCase())
      );
    }
  });

  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={currentPage === number ? "active" : ""}
      >
        {number}
      </button>
    );
  });
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
            <div className="data-table-header pb-4">
              <select name="category" id="selCategory" value={category} onChange={(e) => setCategory(e.target.value)} >
                <option value="all" >Seleccione una categoría: </option>
                {
                  dataCategory.map((category) => (
                    <option key={category.id} value={category.id}> {category.name}</option>
                  ))
                }
              </select>
              <select value={dataPerPage} onChange={handleChangepage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className=""
              />

            </div>
            <div className="row">
              {currentData.map((result) => {
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
          <div className='pagination'>{renderPageNumbers}</div>
        </section>
      )};

    </div>
  );
};
export default Shop;
