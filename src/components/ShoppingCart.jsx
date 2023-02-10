import { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";

function ShoppingCart({ items, onRemoveToCart}) {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [subtotal, setSubTotal] = useState(0);

    useEffect(() => {
            setProducts(items);
    }, []);

    const handleChange = e => {
        setQuantity(e.target.value);
       // setSubTotal(products.reduce((acc, product) => acc + product.price, 0));
    };

    const handleRemoveProduct = (product) => {
        setProducts(products.filter((products) => products.id !== product.id));
        onRemoveToCart(product);
    };
     function calculateTotal(item) {
    return item.price * 2;
  }

    return (
        <section className="h-100 h-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        <MDBTypography tag="h5">
                                            <a href="#!" className="text-body">
                                                <MDBIcon fas icon="long-arrow-alt-left me-2" />
                                                Continuar con la compra
                                            </a>
                                        </MDBTypography>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Carrito de compras</p>
                                                <p className="mb-0">Tiene {quantity} productos en su carrito</p>
                                            </div>
                                            <div>
                                                <p>
                                                    <span className="text-muted">Ordenar por:</span>
                                                    <a href="#!" className="text-body">
                                                        precio
                                                        <MDBIcon fas icon="angle-down mt-1" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        {products.map((product, index) => (
                                            <MDBCard className="mb-3" key={product.id}>
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <MDBCardImage src={product.img}width="200" height="200"  className="rounded-3"
                                                                    alt={product.name} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <MDBTypography tag="h5">{product.name}</MDBTypography>
                                                                <p className="small mb-0">{product.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div className="cart-quantity">
                                                                <MDBInput type="number" name="quantity"/> 
                                                                
                                                                  {/* onChange={(e) => setProducts({ ...product, handleChange })} /> */}
                                                            </div>
                                                            <div className="cart-price">
                                                                <MDBTypography tag="h5" className="mb-0">
                                                                {calculateTotal(product)}
                                                                </MDBTypography>
                                                            </div>
                                                            <a href="#!" className="cart-delete"
                                                                onClick={() => handleRemoveProduct(product)}>
                                                                <MDBIcon fas icon="trash-alt" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        ))}
                                    </MDBCol>

                                    <MDBCol lg="5">
                                        <MDBCard className="bg-primary text-white rounded-3">
                                            <MDBCardBody>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        Detalles de la tarjeta
                                                    </MDBTypography>
                                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                        fluid className="rounded-3" alt="Avatar" />
                                                </div>

                                                <p className="small">Tipo de la tarjeta</p>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                </a>

                                                <form className="mt-4">
                                                    <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                                        placeholder="Cardholder's Name" contrast />

                                                    <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                                                        minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                                                    <MDBRow className="mb-4">
                                                        <MDBCol md="6">
                                                            <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                                                minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                                        </MDBCol>
                                                        <MDBCol md="6">
                                                            <MDBInput className="mb-4" label="Cvv" type="text" size="lg"
                                                                minLength="3" maxLength="3" placeholder="&#9679;&#9679;&#9679;"
                                                                contrast />
                                                        </MDBCol>
                                                    </MDBRow>
                                                </form>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${subtotal}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Descuento</p>
                                                    <p className="mb-2">${products.discount}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total(Incl. descuento)</p>
                                                    <p className="mb-2">${subtotal + products.discount}</p>
                                                </div>
                                                <div className="checkout-button-container">
                                                    <button className="checkout-button">
                                                        <div className="d-flex justify-content-between">
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default ShoppingCart;
