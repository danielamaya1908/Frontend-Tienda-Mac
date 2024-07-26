import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css';
import './PQRS.css'; // Asegúrate de tener este archivo con los estilos personalizados

const PQR = () => {
  return (
    <>
      <Navbar />
      <Container className="pqr-container mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={8}>
            <div className="mb-4 text-center">
              <Image
                src="src/img/pqrs.jpg" // Actualiza la ruta si es necesario
                fluid
                className="pqr-image w-100 border rounded shadow-sm animate__animated animate__fadeIn"
                alt="Contacto PQR"
              />
            </div>
            <Card className="pqr-card shadow-lg border-0 animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <Card.Title className="text-center mb-4 display-3 font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-2s">
                  PQRS - Contacto
                </Card.Title>
                <Card.Text className="text-justify">
                  <p>
                    Para cualquier Petición, Queja, Reclamo o Sugerencia (PQRS), puede contactarnos a través de los siguientes medios:
                  </p>
                  <ul>
                    <li><strong>Teléfonos:</strong> 3173026445 - 3107043507</li>
                    <li><strong>Correo Electrónico:</strong> <a href="mailto:info@tiendapc.com.co">info@tiendapc.com.co</a></li>
                  </ul>
                  <p>
                    Estamos disponibles para atender sus inquietudes y asegurar que su experiencia con nosotros sea satisfactoria.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PQR;
