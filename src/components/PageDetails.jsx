import { useEffect, useRef, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";

const PageDetails = ({ props, onAddToCart }) => {
    const id = useParams("id:").id.substring(3);
    console.log(id);

    const ProductUrl = "http://localhost:8080/product/" + id;
    const [data, setData] = useState([]);
    // CObtener todos los prodcutos
    const peticionGetProduct = async () => {
        await axios.get(ProductUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const ProductUrlP = "http://localhost:8080/product"
    const [dataP, setDataP] = useState([]);
    // CObtener todos los prodcutos
    const peticionGetProductP = async () => {
        await axios.get(ProductUrlP)
            .then(response => {
                setDataP(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency: "USD"
        })
        return formatter.format(value)
    }

    useEffect(() => {
        peticionGetProduct();
        peticionGetProductP();
    }, [])
    return (
        <>
            {data &&
                <Container className="mw-100">
                    <Row className="ProductDetails justify-content-md-center">
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Image src={data.img} className="DetailsImg" rounded />
                        </Col >
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className=''>
                            <Container className="justify-content-center mx-auto">
                                <Row >
                                    <Col className="DetailsTitle  pt-4">
                                        <h1>{data.name}</h1>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col>
                                        <h4>Rating general</h4>
                                        <h4><b className="text-danger">&#9733; {data.dimensions}/10</b></h4>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col>
                                        <h4>Descripción:</h4>
                                        <b>{data.longdesc}</b>
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col className="text-auto">
                                        <h6>Precio: {currencyFormatter(data.price)}</h6>
                                        <h6>Peso: {data.weight}</h6>
                                        <h6>Código: {data.sku}</h6>
                                        <div className="">
                                            <a href={data.img} target="_blank" rel="noreferrer">
                                                <Button type="button " id="watch" className="bg-dark ">
                                                    &#x25BA; Watch
                                                </Button>
                                            </a>
                                            <Button className="bg-danger mt-2 m-md-2" onClick={() => onAddToCart(data)}>
                                                Agregar al carrito
                                            </Button>
                                        </div>
                                    </Col>
                                    <div className="backBtnContainer mt-2">
                                        <NavLink to="/shop"> <Button className="backButton">Regresar</Button></NavLink>
                                    </div>
                                </Row>

                            </Container>

                        </Col>
                    </Row>
                    <Container>
                        <Row className="d-flex flex-column align-items-center mb-4">
                            <Col xs={12} sm={8} className="mx-auto">
                                <h2 className="text-center">PRODUCTOS RELACIONADOS</h2>
                            </Col>
                            <Col xs={12} sm={8} md={8} className="mx-auto">
                                <h3 className="text-center">PROMOCIONES LIMITADAS ¡APROVÉCHALAS AHORA!</h3>
                            </Col>
                        </Row>
                        <div className="row">
                            {dataP.map((result) => {
                                return (
                                    <div className="floating col-sm-6 col-lg-3 " key={result.id}>
                                        <div className="single-publication border rounded">
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
                                            <div className="publication-content m-0 p-0">
                                                <span className="category">Productos</span>
                                                <h3>
                                                    <a className="text-decoration-none" href="#">{result.name}</a>
                                                </h3>

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
                    </Container>
                </Container>
            }

        </>
    )
}

export default PageDetails;