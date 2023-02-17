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
import logo from "../images/K-Market-Campus.png";
import { NavLink } from "react-router-dom";

function ShoppingCart({ items, onRemoveToCart }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(
    JSON.parse(localStorage.getItem("quantities")) ||
    Array(items.length).fill(1)
  );

  useEffect(() => {
    if (localStorage.getItem("quantities") !== null) {
      setQuantities(JSON.parse(localStorage.getItem("quantities")));
    } else {
      setQuantities(items.map(() => 1));
      localStorage.setItem("quantities", JSON.stringify(quantities));
      console.log(items.map(() => 1));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    setProducts(items);
    console.log(products);
  }, [products]);

  const total = products.reduce(
    (acc, product, index) => acc + product.price * quantities[index],
    0
  );
  const cant = products.length;
  const handleChange = (index, event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const handleRemoveProduct = (product, index) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
    localStorage.setItem("quantities", JSON.stringify(newQuantities));

    setProducts(products.filter((products) => products.id !== product.id));
    onRemoveToCart(product);
  };

  const sendMessage = () => {
    const phoneNumber = encodeURIComponent(593993273984);
    let message = encodeURIComponent("");
    message += `-------------------------*FACTURA*------------------------\n` +
      `FACSIW001\n`;
    products.forEach((product, index) => {
      message +=
        `*Producto ${index + 1}*\n` +
        `*${product.name}* \n` +
        `Descripcion: ${product.description}\n` +
        `Imagen: ${product.img}\n\n` +
        `Precio Unitario: ${product.price}\n\n`;
    });

    message +=
      `*SubTotal:* ${total.toFixed(2)}\n\n` +
      `*Descuento:* ${(total * 0.1).toFixed(2)}\n\n` +
      `*Total:* ${(total - total * 0.1).toFixed(2)}\n\n`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <section className="h-100 h-custom">
      {currentUser ? (
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol lg="7">
                      <MDBTypography tag="h5">
                        <NavLink
                          to="/shop"
                          activeclassname="active"
                          exact="true"
                          className="nav-link"
                        >
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />
                          Continuar comprando
                        </NavLink>
                      </MDBTypography>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Carrito de compras</p>
                          <p className="mb-0">
                            Tiene {cant} productos en su carrito
                          </p>
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
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center mb-3 mb-md-0 col-lg-9">
                                <div>
                                  <MDBCardImage
                                    src={product.img}
                                    width="200"
                                    height="200"
                                    className="rounded-3"
                                    alt={product.name}
                                  />
                                </div>
                                <div className="ms-3 col-xs-12">
                                  <MDBTypography tag="h5" className="">
                                    {product.name}
                                  </MDBTypography>
                                  <p className="small mb-0 d-none d-sm-block">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center justify-content-end">
                                <div className="cart-quantity me-3">
                                  <MDBInput
                                    type="number"
                                    value={quantities[index] || 1}
                                    onChange={handleChange.bind(null, index)}
                                  />
                                </div>
                                <div className="cart-price me-3">
                                  <MDBTypography tag="h5" className="mb-0">
                                    {(
                                      product.price * quantities[index]
                                    ).toFixed(2)}
                                  </MDBTypography>
                                </div>
                                <a
                                  href="#!"
                                  className="cart-delete"
                                  onClick={() =>
                                    handleRemoveProduct(product, index)
                                  }
                                >
                                  <MDBIcon fas icon="trash-alt" />
                                </a>
                              </div>
                            </div>


                          </MDBCardBody>
                        </MDBCard>
                      ))}
                    </MDBCol>

                    <MDBCol lg="5">
                      <MDBCard className="bg-info text-white rounded-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0 ">
                              Detalles de la tarjeta
                            </MDBTypography>
                            <MDBCardImage
                              src={logo}
                              fluid
                              className="rounded-3 "
                              alt="Avatar"
                              width="150PX"
                            />
                          </div>

                          <p className="small ">Tipo de la tarjeta</p>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                          </a>

                          <form className="mt-4">
                            <MDBInput
                              className="mb-4 "
                              label="Cardholder's Name"
                              type="text"
                              size="lg"
                              placeholder="Cardholder's Name"
                              contrast
                            />

                            <MDBInput
                              className="mb-4"
                              label="Card Number"
                              type="text"
                              size="lg"
                              minLength="19"
                              maxLength="19"
                              placeholder="1234 5678 9012 3457"
                              contrast
                            />

                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="Expiration"
                                  type="text"
                                  size="lg"
                                  minLength="7"
                                  maxLength="7"
                                  placeholder="MM/YYYY"
                                  contrast
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="Cvv"
                                  type="text"
                                  size="lg"
                                  minLength="3"
                                  maxLength="3"
                                  placeholder="&#9679;&#9679;&#9679;"
                                  contrast
                                />
                              </MDBCol>
                            </MDBRow>
                          </form>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2 ">Subtotal</p>
                            <p className="mb-2 ">${total.toFixed(2)}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2 ">Descuento %10</p>
                            <p className="mb-2 "> {'$' + (total * 0.1).toFixed(2)}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2 ">Total(Incl. descuento)</p>
                            <p className="mb-2 ">
                              {'$' + (total - total * 0.1).toFixed(2)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <button className="btn btn-warning me-2">
                              <NavLink to="/payment" title="Vistazo Rápido" className="text-white text-decoration-none">
                                Pagar con tarjeta <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </NavLink>
                            </button>
                            <button type="button" className="btn btn-success p-2" onClick={sendMessage}>
                              <i className="fab fa-whatsapp me-2"></i>Pagar con Whatsapp
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
      ) : (
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Aún no has iniciado sesión.</h5>
            <p class="card-text">Para comenzar a comprar, debe iniciar sesión o registrarse.</p>
            <NavLink to="/login">
              <button type="button" class="btn-login btn">
                {" "}
                Registrarse

              </button>
            </NavLink>
          </div>
        </div>
      )}
    </section>
  );
}

export default ShoppingCart;
