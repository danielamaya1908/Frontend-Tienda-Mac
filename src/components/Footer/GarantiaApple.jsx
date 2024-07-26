import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css'; // Importa Animate.css
import './AppleWarranty.css';

const AppleWarranty = () => {
  return (
    <>
      <Navbar />
      <Container className="warranty-container mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={8}>
            {/* Add the image at the start */}
            <div className="mb-4 text-center">
              <Image 
                src="src/img/garantia.jpg" 
                fluid 
                className="w-100 border rounded shadow-sm animate__animated animate__fadeIn" 
                alt="Garantía Productos Apple" 
              />
            </div>
            <Card className="warranty-card shadow-lg border-0 animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <Card.Title className="text-center mb-4 display-3 font-weight-bold text-dark">
                  Garantía Productos Apple
                </Card.Title>
                <Card.Text className="text-justify">
                  <h4 className="font-weight-bold text-dark">I. Garantía Productos Apple</h4>
                  <p>Todo producto Apple cuenta con un (1) año de garantía limitada.</p>
                  <p>Solamente aplica la garantía de productos Apple por defectos de fabricación del hardware o mano de obra.</p>
                  <p>Para las computadoras Mac, no se hace cambio de la máquina sino únicamente de la pieza afectada. Para productos como iPod, iPad y accesorios Apple se reemplaza por una unidad de servicio.</p>
                  <p>Para el caso de iPhone se podrá reemplazar por la pieza afectada o realizar el cambio por una unidad de servicio, según sea el tipo de falla que presente.</p>
                  <h4 className="font-weight-bold text-dark mt-4">II. ¿Qué anula la garantía de los productos Apple?</h4>
                  <p>Todo tipo de daños causado por un accidente, mal uso, contacto con líquido, incendio, terremoto o cualquier otra causa externa por ejemplo causado por el uso con productos que no sean Apple.</p>
                  <p>Daños en apariencia, incluyendo rayones, abolladuras o plástico roto sin limitaciones.</p>
                  <p>Defectos causados por el uso normal cotidiano o derivados del desgaste normal del producto.</p>
                  <p>Modificación de un producto o pieza que haya sido alterada su función sin la autorización escrita de Apple.</p>
                  <p>No abra el Producto Apple. Abrir el Producto Apple puede causar un daño que no esté cubierto por esta Garantía. Apple o un AASP son los únicos que pueden llevar a cabo tareas de reparación en el Producto Apple.</p>
                  <p>Restricción importante para servicio de iPhone e iPad: Apple podrá restringir el servicio por garantía para iPhone e iPad al país en el que Apple o sus distribuidores autorizados originalmente vendieron el dispositivo.</p>
                  <h4 className="font-weight-bold text-dark mt-4">III. Servicio por garantía</h4>
                  <p>Apple o sus agentes pueden requerir que usted envíe prueba de algún documento o dato de la compra, responda a preguntas diseñadas para asesorar los problemas potenciales y seguir así el procedimiento de Apple para obtener la garantía del servicio. Antes de someter su Producto Apple al servicio de garantía usted deberá tener un respaldo por separado que contenga copia de los contenidos almacenados, deberá remover toda la información personal que usted quisiera proteger así como desactivar cualquier contraseña.</p>
                  <p>Durante el servicio de garantía es posible que los contenidos en el dispositivo serán eliminados, reemplazados o reformateados. Apple y sus agentes no serán responsables por cualquier pérdida de programas de “software”, o cualquier otra información contenida en el dispositivo o cualquier otra parte del producto apple que se le haya realizado el servicio.</p>
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

export default AppleWarranty;
