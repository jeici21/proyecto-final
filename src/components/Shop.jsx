//import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/K-Market-2.png";
import Context from "../../src/redux/controlUsuario/Context";
//import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loadProducts } from "../api/loadProducts";
import { loadCategories } from "../api/loadCategories";

const Shop = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const { state, setState } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  //const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
    //carga todos los productos del base de datos al inicar este pagina
    getProductsFromDb();
    //carga todas las categorias al momento de iniciar esta pagina
    getCategories();
  }, []);

  if (currentUser) {
    // console.log(currentUser);
    localStorage.setItem("rolUser", JSON.stringify(currentUser?.roles[0]?.roleCode));
    // setState({ ...state, data: currentUser});
  } else {
    console.log("Cerrado y sin datos desde SHop");
  }

  /*  let firstName;
   let lastName;
   if (state && state.data) {
     firstName = state.data.firstName;
     lastName = state.data.lastName;
     console.log("dese shop" + firstName);
   }
  */
  const logOut = () => {
    localStorage.clear();
    setState("cerrado Sesion");
    navigate("/");
  };
  // CObtener todos los Category
  const peticionGetCategory = async () => {
    const resp = await (await loadCategories()).data;
    if (resp) {
      setDataCategory(resp);
      console.log(resp);
    } else {
      setDataCategory([]);
    }
  }
  useEffect(() => {
    getProductsFromDb();
    peticionGetCategory();
    window.scrollTo(0, 0);
  }, []);

  const getProductsFromDb = async () => {
    const resp = await (await loadProducts()).data;
    if (resp) {
      setProducts(resp);
      console.log(resp);
    } else {
      setProducts([]);
    }
  };

  const getCategories = async () => {
    const resp = await (await loadCategories()).data;
    if (resp) {
      setDataCategory(resp);
    } else {
      setDataCategory([]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);
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

  const filteredData = products?.filter((item) => {
    if (category !== "all") {
      // Si se ha seleccionado una categor??a espec??fica, filtrar solo los productos de esa categor??a
      if (searchTerm.trim() === "") {
        // Si el t??rmino de b??squeda est?? vac??o, aplicar solo el filtro por categor??a
        return item.productCategory.id === parseInt(category);
      } else {
        // Si hay un t??rmino de b??squeda, aplicar tanto el filtro por categor??a como el filtro por t??rmino de b??squeda
        return (
          item.productCategory.id === parseInt(category) &&
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm.toLowerCase()))
        );
      }
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toString().includes(searchTerm.toLowerCase())
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
        <section className="our-publication pt-50 pb-0">
          <div className="container">
            <div className="section-header">
              {/* <i className="fa fa-cart-arrow-down" /> */}
              <h2 className="m-0">
                Productos <img src={logo} alt="KMarket" className="logo-shop" />
              </h2>
              <p className="mt-0">
                Aqu?? podr?? revisar nuestro cat??logo de productos.
              </p>
            </div>
            <div className="data-table-header pb-4 justify-content-between p-2">
              <div className="col-s-12 col-sm-10 col-md-4 col-lg-3">
                <select value={dataPerPage} onChange={handleChangepage}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="col-s-12 col-sm-10 col-md-4 col-lg-3">
                <select name="category" className="form-control" id="selCategory" value={category} onChange={(e) => setCategory(e.target.value)} >
                  <option value="all" >Seleccione una categor??a: </option>
                  {
                    dataCategory.map((category) => (
                      <option key={category.id} value={category.id}> {category.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="col-s-12 col-sm-10 col-md-4 col-lg-3">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
              </div>

            </div>
            <div className="row">
              {currentData.map((result) => {
                return (
                  <div className="floating col-sm-6 col-lg-3 " key={result.id}>
                    <div className="single-publication border rounded">
                      <figure>
                        <a href="#?" className="product-image">
                          <img src={result.img} alt="Publication" />
                        </a>
                        <ul>
                          <li >
                            <a href="#?" title="A??adir a Favoritos" className="bg">
                              <i className="fa fa-heart" />
                            </a>
                          </li>
                          <li>
                            <NavLink
                              to={`/details/id:${result.id}`}
                              title="Vistazo R??pido"
                              className="bg"
                            >
                              <i className="fa fa-search " />
                            </NavLink>
                          </li>
                        </ul>
                      </figure>
                      <div className="publication-content m-0 p-0 flex-wrap">
                        <span className="category">{result.productCategory.name}</span>
                        <h3 className="text-truncate">
                          <a href="#?" className="text-decoration-none" style={{ whiteSpace: 'nowrap' }}>
                            {result.name}
                          </a>
                        </h3>

                        <h4 className="price">${result.price}</h4>
                      </div>
                      <div className="add-to-cart">
                        <button
                          className="default-btn"
                          onClick={() => onAddToCart(result)}
                        >
                          A??adir al Carro
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pagination">{renderPageNumbers}</div>
        </section>
      )}
    </div>
  );
};
export default Shop;
