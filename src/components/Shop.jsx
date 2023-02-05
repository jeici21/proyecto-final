import axios from 'axios';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        makeAPICall();
    }, []);

    const makeAPICall = async () => {
        try {
            //https://api.escuelajs.co/api/v1/products
            //http://localhost:8080/product
            axios.get('http://localhost:8080/product' // , { mode: 'no-cors' // 'cors' by default}
            ).then(res => {
                setProducts(res.data);
                console.log(res.data);
            });
        }
        catch (e) {
          console.log(e)
        }
      }
    return (
        <div className="main_container">
            <section className="our-publication pt-50 pb-50">
                <div className="container">
                    <div className="section-header">
                        <i className="fa fa-cart-arrow-down"></i>
                        <h2>KMarket Products</h2>
                        <p>Esperamos que los productos que ofrecemos sean de su gusto.</p>
                    </div>
                    <div className="row">
                        {products.map((result) => {
                            return (
                                <div className="col-sm-6 col-lg-3" key={result.id}>
                                    <div className="single-publication">
                                        <figure>
                                            <a href="#">
                                                <img src={result.img} alt="Publication" />
                                            </a>
                                            <ul> 
                                                <li><a href="#" title="Add to Favorite"><i className="fa fa-heart"></i></a></li>
                                                <li><a href="#" title="Add to Compare"><i className="fa fa-refresh"></i></a></li>
                                                <li><a href="#" title="Quick View"><i className="fa fa-search"></i></a></li>
                                            </ul>
                                        </figure>
                                        <div className="publication-content">
                                            <span className="category">Products</span>
                                            <h3><a href="#">{result.name}</a></h3>
                                            <ul>
                                                <li><i className="icofont-star"></i></li>
                                                <li><i className="icofont-star"></i></li>
                                                <li><i className="icofont-star"></i></li>
                                                <li><i className="icofont-star"></i></li>
                                                <li><i className="icofont-star"></i></li>
                                            </ul>
                                            <h4 className="price">${result.price}</h4>
                                        </div>
                                        <div className="add-to-cart">
                                            <a href="#" className="default-btn">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;