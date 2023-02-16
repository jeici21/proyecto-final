//import axios from "axios";
import { useEffect, useState } from "react";
import { loadProducts } from "../api/loadProducts";

const Carousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        getProductsFromDb();
    }, []);

    const getProductsFromDb = async () => {
        const resp = await (await loadProducts()).data;
        if (resp) {
            //obteniendo los 3 primeros productos de la api
            setProducts(resp.slice(0, 3));
        }
        console.log(resp);
    }

    return (
        <div id="template-mo-jassa-hero-carousel" className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators">
                {products?.map((product, index) => (//mostrando un producto por página
                    <li data-bs-target="#template-mo-jassa-hero-carousel" data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''} />
                ))}
            </ol>
            <div className="carousel-inner">
                {products.map((product, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="container">
                            <div className="row p-5" key={product.id}>
                                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                    <img className="img-fluid" src={product.img} alt="" />
                                </div>
                                <div className="col-lg-6 mb-0 d-flex align-items-center">
                                    <div className="text-align-left align-self-center">
                                        <h1 className="h1"><b>{product.name}</b></h1>
                                        <h3 className="h2">{product.description}</h3>
                                        <p>{product.longdesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-jassa-hero-carousel" role="button" data-bs-slide="prev">
                <i className="fas fa-chevron-left"></i>
            </a>
            <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-jassa-hero-carousel" role="button" data-bs-slide="next">
                <i className="fas fa-chevron-right"></i>
            </a>
        </div>
    );
}

export default Carousel;