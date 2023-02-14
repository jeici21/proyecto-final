import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import logo from "../images/k-Market.png";
import { Image } from 'react-bootstrap';


const PaymentSuccess = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
        <Image src={logo} fluid className="responsive-img" />
          <Alert variant="success">
            <Alert.Heading>Pago exitoso</Alert.Heading>
            <p>
              Tu pago ha sido procesado exitosamente. Gracias por utilizar
              nuestro servicio.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
