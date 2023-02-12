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
                                    <Col >
                                        <h6>Precio: {currencyFormatter(data.price)}</h6>
                                        <h6>Peso: {data.weight}</h6>
                                        <h6>Código: {data.sku}</h6>
                                        <a href={data.img} target="_blank" rel="noreferrer">
                                            <Button type="button" id="watch" className="bg-dark p-2">
                                                &#x25BA; Watch
                                            </Button>
                                        </a>
                                        <Button className="bg-danger p-2 m-2" onClick={() => onAddToCart(data)}>
                                            Agregar al carrito
                                        </Button>
                                    </Col>
                                    <div className="backBtnContainer">
                                        <NavLink to="/shop"> <Button className="backButton">Regresar</Button></NavLink>
                                    </div>

                                </Row>

                            </Container>

                        </Col>
                    </Row>
                </Container>
            }

        </>
    )
}

export default PageDetails;