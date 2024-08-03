// src/components/PaymentMethods/PaymentMethods.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCreditCard, FaPaypal, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import CardPayment from './CardPayment';
import PSEPayment from './PSEPayment';
import PayoutsPayment from './PayoutsPayment'; // Importa el componente de pagos Payouts
import styles from './PaymentMethods.module.css';
import { useLocation } from 'react-router-dom';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation();
  const totalAmount = location.state?.totalAmount;

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className={styles.paymentPage}>
      <Navbar />
      <Container className={`my-5 ${styles.paymentContainer}`}>
        <h2 className={`text-center mb-4 ${styles.paymentTitle}`}>Seleccione un Método de Pago</h2>
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card 
              className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <Card.Body className="d-flex align-items-center">
                <FaCreditCard className={`${styles.icon} me-3`} />
                <span className={styles.paymentText}>Pago con Tarjeta</span>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card 
              className={`${styles.paymentOption} ${paymentMethod === 'pse' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodChange('pse')}
            >
              <Card.Body className="d-flex align-items-center">
                <FaUniversity className={`${styles.icon} me-3`} />
                <span className={styles.paymentText}>Pago PSE</span>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={6} className="mb-3">
            <Card 
              className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <Card.Body className="d-flex align-items-center">
                <FaPaypal className={`${styles.icon} me-3`} />
                <span className={styles.paymentText}>Pago con PayPal</span>
              </Card.Body>
            </Card>
          </Col> */}
         {/*  <Col md={6} className="mb-3">
            <Card 
              className={`${styles.paymentOption} ${paymentMethod === 'transfer' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodChange('transfer')}
            >
              <Card.Body className="d-flex align-items-center">
                <FaUniversity className={`${styles.icon} me-3`} />
                <span className={styles.paymentText}>Transferencia Bancaria</span>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md={6} className="mb-3">
            <Card 
              className={`${styles.paymentOption} ${paymentMethod === 'payouts' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodChange('payouts')}
            >
              <Card.Body className="d-flex align-items-center">
                <FaMoneyBillWave className={`${styles.icon} me-3`} />
                <span className={styles.paymentText}>Payouts</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {paymentMethod === 'card' && <CardPayment totalAmount={totalAmount} />}
        {paymentMethod === 'pse' && <PSEPayment totalAmount={totalAmount} />}
        {paymentMethod === 'payouts' && <PayoutsPayment totalAmount={totalAmount} />}
        {/* Agrega los componentes para PayPal y Transferencia Bancaria aquí */}
      </Container>
      <Footer />
    </div>
  );
};

export default PaymentMethods;
