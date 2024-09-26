import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import styles from './PayoutsPayment.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaIdCard } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; // Importar el contexto del carrito

const PayoutsPayment = ({ totalAmount }) => {
  const { clearCart } = useCart(); // Obtener la función clearCart del contexto
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

  const [receiptUrl, setReceiptUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        customer: customerData,
        charge: {
          amount: totalAmount,
          description: 'COMPRA EN TIENDA MAC',
          iva: 0, // Si aplicable, ajusta el IVA aquí
        },
      };

      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/api/openpay/store-payment', paymentData);

      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.receipt_url) {
        setReceiptUrl(response.data.receipt_url);
        // Vaciar el carrito
        clearCart();
        // Redirigir al usuario
        window.location.href = response.data.receipt_url;
      } else {
        console.error('No se recibió una URL de recibo válida');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className={styles.payoutsPaymentForm}>
        <h2 className={styles.formTitle}>Pago con Payouts</h2>
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
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicPhone" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaPhone className={styles.icon} /> Teléfono
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Teléfono"
                name="phone_number"
                value={customerData.phone_number}
                onChange={handleInputChange}
                className={styles.formControl}
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
        <Form.Group controlId="formBasicDocumentNumber" className={styles.formGroup}>
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
            Pagar con Payouts
          </Button>
        </div>
      </Form>
      {receiptUrl && (
        <div className={styles.barcodeWrapper}>
          <img src={receiptUrl} alt="Recibo de Pago" />
        </div>
      )}
    </div>
  );
};

export default PayoutsPayment;
