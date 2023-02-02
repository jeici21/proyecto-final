import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/products').then(res => {
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
                    </div>
                    <div class="row">
                        {products.map((result) => {
                            return (
                                <div class="col-sm-6 col-lg-3">
                                    <div class="single-publication">
                                        <figure>
                                            <a href="#">
                                                <img src={result.images} alt="Publication" onClick={() => handleShow(result)} />
                                            </a>
                                            <ul>
                                                <li><a href="#" title="Add to Favorite"><i class="fa fa-heart"></i></a></li>
                                                <li><a href="#" title="Add to Compare"><i class="fa fa-refresh"></i></a></li>
                                                <li><a href='#' title="Quick View"><i class="fa fa-search"></i></a></li>
                                            </ul>
                                        </figure>
                                        <div class="publication-content">
                                            <span class="category">Products</span>
                                            <h3><a href="#">{result.title}</a></h3>
                                            <ul>
                                                <li><i class="icofont-star"></i></li>
                                                <li><i class="icofont-star"></i></li>
                                                <li><i class="icofont-star"></i></li>
                                                <li><i class="icofont-star"></i></li>
                                                <li><i class="icofont-star"></i></li>
                                            </ul>
                                            <h4 class="price">{result.price}</h4>
                                        </div>
                                        <div class="add-to-cart">
                                            <a href="#" class="default-btn">Add to Cart</a>
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
                    <Modal.Title>{selectedProduct.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedProduct.images} alt="" className='modal-image' />
                    <p>Price: {selectedProduct.price}</p>
                    <p>Description: {selectedProduct.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Shop;