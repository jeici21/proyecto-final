import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import logo from "../images/k-Market.png";


const PaymentSuccess = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
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
