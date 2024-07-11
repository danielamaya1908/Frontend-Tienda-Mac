import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaUniversity, FaMobileAlt } from 'react-icons/fa';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import styles from './PaymentMethods.module.css';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Procesando pago con método: ${paymentMethod}`);
    navigate('/confirmation');
  };

  const paymentOptions = [
    { id: 'credit-card', label: 'Tarjeta de Crédito', icon: <FaCreditCard /> },
    { id: 'debit-card', label: 'Tarjeta de Débito', icon: <FaCreditCard /> },
    { id: 'paypal', label: 'PayPal', icon: <FaPaypal /> },
    { id: 'pse', label: 'PSE', icon: <FaUniversity /> },
    { id: 'bank-transfer', label: 'Transferencia Bancaria', icon: <FaUniversity /> },
    { id: 'credit-system', label: 'Sistema de Crédito', icon: <FaMobileAlt /> },
  ];

  return (
    <div className={styles.paymentPage}>
      <Navbar />
      <Container className={`my-5 ${styles.paymentContainer}`}>
        <h2 className={`${styles.paymentTitle} text-center mb-4`}>Métodos de Pago</h2>
        <Card className={styles.paymentCard}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                {paymentOptions.map((option) => (
                  <Col md={6} key={option.id}>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="radio"
                        id={option.id}
                        label={
                          <span className={styles.paymentLabel}>
                            {option.icon}
                            <span className={styles.paymentText}>{option.label}</span>
                          </span>
                        }
                        name="paymentMethod"
                        value={option.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className={styles.paymentOption}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Button 
                variant="primary" 
                type="submit" 
                className={styles.submitButton} 
                disabled={!paymentMethod}
              >
                Confirmar Pago
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default PaymentMethods;