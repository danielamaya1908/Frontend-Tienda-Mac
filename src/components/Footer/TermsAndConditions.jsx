import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container className="terms-container mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={8}>
            <div className="mb-4 text-center">
              <Image
                src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1721972268/TiendaMac/lbcvo6fkqshvqkh89bjy.webp"
                fluid
                className="terms-image w-100 border rounded shadow-sm animate__animated animate__fadeIn"
                alt="Términos y Condiciones"
              />
            </div>
            <Card className="terms-card shadow-lg border-0 animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <Card.Title className="text-center mb-4 display-3 font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-2s">
                  Aviso de Privacidad
                </Card.Title>
                <Card.Text className="text-justify">
                  <p>
                    Estimado Cliente,
                  </p>
                  <p>
                    El Responsable del tratamiento de sus Datos Personales recolectados es Tienda Personal Computer SAS, con domicilio en la Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar., página web: <a href="http://www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a>, correo electrónico: <a href="mailto:info@tiendapc.com.co">info@tiendapc.com.co</a>, teléfono: 6055734688.
                  </p>
                  <p>
                    La finalidad de recolección de sus datos personales es mejorar el flujo de información entre Tienda Mac y sus clientes, para así estar en constante desarrollo de los bienes y servicios ofertados por nosotros.
                  </p>
                  <p>
                    Sus derechos como titular de la información recolectada son: CONOCER, ACTUALIZAR, RECTIFICAR Y EXCLUIR DICHA INFORMACIÓN DE NUESTRA BASE DE DATOS.
                  </p>
                  <p>
                    Para conocer sobre sus derechos, las herramientas que tiene para protegerlos y de los compromisos que Tienda Mac tiene con usted, lo invitamos a revisar las Políticas de Tratamiento de la Información dispuestas en nuestra página web <a href="http://www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a> en la pestaña Políticas de Privacidad. De no tener acceso a la Página Web, también podrá solicitar una copia física de estas políticas en cualquiera de nuestras tiendas.
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

export default TermsAndConditions;
