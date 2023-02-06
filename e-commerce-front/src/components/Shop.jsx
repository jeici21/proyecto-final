import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { fetchUserData } from "../../src/api/authenticationService";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [data, setData] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  return (
    <div className="main_container">
      <section class="our-publication pt-50 pb-50">
        <div class="container">
          <div class="section-header">
            <i class="fa fa-cart-arrow-down"></i>
            <h2>KMarket Products</h2>
            <p>Esperamos que los productos que ofrecemos sean de su gusto.</p>
            <h4> {data && `${data.firstName} ${data.lastName}`}</h4>
          </div>
          <div class="row">
            {products.map((result) => {
              return (
                <div class="col-sm-6 col-lg-3">
                  <div class="single-publication">
                    <figure>
                      <a href="#">
                        <img
                          src={result.images}
                          alt="Publication"
                          onClick={() => handleShow(result)}
                        />
                      </a>
                      <ul>
                        <li>
                          <a href="#" title="Add to Favorite">
                            <i class="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Add to Compare">
                            <i class="fa fa-refresh"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Quick View">
                            <i class="fa fa-search"></i>
                          </a>
                        </li>
                      </ul>
                    </figure>
                    <div class="publication-content">
                      <span class="category">Products</span>
                      <h3>
                        <a href="#">{result.title}</a>
                      </h3>
                      <ul>
                        <li>
                          <i class="icofont-star"></i>
                        </li>
                        <li>
                          <i class="icofont-star"></i>
                        </li>
                        <li>
                          <i class="icofont-star"></i>
                        </li>
                        <li>
                          <i class="icofont-star"></i>
                        </li>
                        <li>
                          <i class="icofont-star"></i>
                        </li>
                      </ul>
                      <h4 class="price">{result.price}</h4>
                    </div>
                    <div class="add-to-cart">
                      <a href="#" class="default-btn">
                        Add to Cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-row">
            <div className="modal-column">
              <h4>{selectedProduct.title}</h4>
              <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label>
                      {/* <input type="radio" name="rating" value={ratingValue}
                                                onClick={() => setRating(ratingValue)} /> */}
                      <i
                        className="fa fa-star"
                        style={{
                          color:
                            ratingValue <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9",
                        }}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                    </label>
                  );
                })}
              </div>
              <Collapsible trigger="Product Description">
                <p>{selectedProduct.description}</p>
              </Collapsible>
              <h4>Product Price</h4>
              <p>{selectedProduct.price}</p>
            </div>
            <div className="modal-column">
              <img
                src={selectedProduct.images}
                alt=""
                className="modal-image"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="default-btn"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Shop;
