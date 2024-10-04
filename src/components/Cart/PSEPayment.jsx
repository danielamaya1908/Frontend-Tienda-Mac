import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from './PSEPayment.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaIdCard } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PSEPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();
  const [totalAmount, setTotalAmount] = useState(500);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department: '',
    city: '',
    additional: '',
    document_number: ''
  });

  useEffect(() => {
    if (location.state) {
      if (location.state.totalAmount) {
        setTotalAmount(location.state.totalAmount);
      }
      if (location.state.userId) {
        setUserId(location.state.userId);
      }
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const productId = cartItems.length > 0 ? cartItems[0].id : null;

      if (!productId) {
        throw new Error('No se encontró ningún producto en el carrito');
      }

      const paymentData = {
        charge: {
          method: 'bank_account',
          amount: totalAmount,
          currency: 'COP',
          description: 'Pago en Tienda Mac',
          customer: customerData,
          confirm: 'false',
          send_email: 'true',
          redirect_url: 'https://www.tiendamac.net/payment-confirmation',
        },
        customer: {
          name: customerData.name,
          last_name: customerData.last_name,
          email: customerData.email,
          phone_number: customerData.phone_number,
          department: customerData.department,
          city: customerData.city,
          additional: customerData.additional,
          document_number: customerData.document_number
        },
        userId: userId,
        productId: productId
      };

      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/api/openpay/pse-payment', paymentData);

      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.payment_method && response.data.payment_method.url) {
        await axios.post('https://backend-tienda-mac-production.up.railway.app/update-quantity', { items: cartItems });
        clearCart();
        window.location.href = response.data.payment_method.url;
      } else {
        throw new Error('No se recibió una URL de redirección válida');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error.response?.data?.error || error.message || 'Ocurrió un error al procesar el pago');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.psePaymentForm}>
      <h2 className={styles.formTitle}>Pago PSE</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group controlId="formBasicName" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaUser className={styles.icon} /> Nombre
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="name"
              value={customerData.name}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBasicLastName" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaUser className={styles.icon} /> Apellido
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="last_name"
              value={customerData.last_name}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaEnvelope className={styles.icon} /> Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBasicPhone" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaPhone className={styles.icon} /> Teléfono
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Teléfono"
              name="phone_number"
              value={customerData.phone_number}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formBasicDepartment" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaMapMarkedAlt className={styles.icon} /> Departamento
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Departamento"
              name="department"
              value={customerData.department}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBasicCity" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              <FaMapMarkedAlt className={styles.icon} /> Ciudad
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad"
              name="city"
              value={customerData.city}
              onChange={handleInputChange}
              className={styles.formControl}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formBasicAdditional" className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>
          <FaMapMarkedAlt className={styles.icon} /> Dirección Adicional
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Dirección Adicional"
          name="additional"
          value={customerData.additional}
          onChange={handleInputChange}
          className={styles.formControl}
        />
      </Form.Group>
      <Form.Group controlId="formBasicDocument" className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>
          <FaIdCard className={styles.icon} /> Número de Documento
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Número de Documento"
          name="document_number"
          value={customerData.document_number}
          onChange={handleInputChange}
          className={styles.formControl}
        />
      </Form.Group>
      <div className={styles.buttonContainer}>
        <Button variant="primary" type="submit" className={styles.submitButton}>
          Procesar Pago
        </Button>
      </div>
    </Form>
  );
};

export default PSEPayment;