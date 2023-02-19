import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const ProductUrl = "http://localhost:8080/product";
    // Obtener datos de productos
    const peticionGetProducts = async () => {
        await axios.get(ProductUrl)
            .then(response => {
                setProducts(response.data);;
            }).catch(error => {
                console.log(error);
            })
    }
    const filteredProducts = products
    ? products
        .filter((product) => product)
        .sort((a, b) => b.dimensions - a.dimensions)
        .slice(0, 3)
    : products;
    useEffect(() => {
        peticionGetProducts();
    }, []);
    return (
        <section className="bg-light">
            <div className="container py-5">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">Productos destacados</h1>
                    </div>
                </div>
                <div className="row">
                    {filteredProducts.map((result) => {
                        return (
                            <div className="floating col-12 col-md-4 mb-4 " key={result.id}>
                                <div className="card h-100">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-center">
                                            <NavLink
                                                to={`/details/id:${result.id}`}
                                                title="Vistazo Rápido"
                                                className="bg"
                                            >
                                                <img src={result.img} className="" width="300px" alt="" />
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled d-flex justify-content-between">
                                            <li>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-muted fa fa-star"></i>
                                            </li>
                                            <li className="text-muted text-right">${result.price}</li>
                                        </ul>
                                        <a href="#?" className="h2 text-decoration-none text-dark">{result.name}</a>
                                        <div className="flex-wrap">
                                            <p className="card-text text-truncate">
                                                {result.longdesc}
                                            </p>
                                        </div>
                                        <p className="text-muted">Reviews (24)</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}

export default FeaturedProducts;