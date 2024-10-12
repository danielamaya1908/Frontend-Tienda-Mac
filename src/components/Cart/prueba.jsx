import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import styles from './CardPayment.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaIdCard } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CardPayment = () => {
    const location = useLocation();
    const { clearCart, cartItems } = useCart();
    const [totalAmount, setTotalAmount] = useState(500);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [customerData, setCustomerData] = useState({
        name: '',
        last_name: '',
        customer_email: '',
        customer_phone: '',
        customer_department: '',
        customer_city: '',
        customer_address: '',
        customer_document_number: '',
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
                method: 'card',
                amount: totalAmount,
                currency: 'COP',
                description: 'Pago en Tienda Mac',
                customer: {
                    name: customerData.name,
                    last_name: customerData.last_name,
                    email: customerData.customer_email,
                    phone_number: customerData.customer_phone,
                    customer_address: {
                        department: customerData.customer_department,
                        city: customerData.customer_city,
                        additional: customerData.customer_address,
                    },
                    document_number: customerData.customer_document_number,
                },
                confirm: 'false',
                send_email: 'true',
                redirect_url: `${window.location.origin}/payment-confirmation`,
                userId: userId,
                productId: productId
            };

            const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/api/openpay/create-charge', paymentData);

            console.log('Respuesta del servidor:', response.data);

            if (response.data && response.data.payment_method && response.data.payment_method.url) {
                await axios.post('https://backend-tienda-mac-production.up.railway.app/update-quantity', { items: cartItems });
                clearCart();
                window.location.href = response.data.payment_method.url;
            } else {
                console.error('No se recibió una URL de redirección válida');
                setError('Error en la respuesta del servidor. Por favor, intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            setError('Error al procesar el pago. Por favor, intente nuevamente.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.cardPaymentForm}>
            <h2 className={styles.formTitle}>Pago con Tarjeta</h2>
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
                            name="customer_email"
                            value={customerData.customer_email}
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
                            name="customer_phone"
                            value={customerData.customer_phone}
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
                            name="customer_department"
                            value={customerData.customer_department}
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
                            name="customer_city"
                            value={customerData.customer_city}
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
                    name="customer_address"
                    value={customerData.customer_address}
                    onChange={handleInputChange}
                    className={styles.formControl}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBasicDocument" className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>
                    <FaIdCard className={styles.icon} /> Número de Documento
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Número de Documento"
                    name="customer_document_number"
                    value={customerData.customer_document_number}
                    onChange={handleInputChange}
                    className={styles.formControl}
                    required
                />
            </Form.Group>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.buttonContainer}>
                <Button variant="primary" type="submit" className={styles.submitButton}>
                    Procesar Pago
                </Button>
            </div>
        </Form>
    );
};

export default CardPayment;