import React from 'react';
import { useCart } from '../../context/CartContext';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Trash, Dash, Plus, Cart as CartIcon, CreditCard } from 'react-bootstrap-icons';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleProceedToPayment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/payment-methods');
    } else {
      navigate('/LoginUser');
    }
  };

  return (
    <div className={styles.cartPage}>
      <Navbar />
      <Container className={`my-5 ${styles.cartContainer}`}>
        <h2 className={`${styles.cartTitle} text-center mb-4`}>
          <CartIcon className="me-2" /> Tu Carrito
        </h2>
        {cartItems.length === 0 ? (
          <Card className="text-center p-5">
            <Card.Body>
              <h4 className="text-muted">Tu carrito está vacío</h4>
              <Link to="/" className="btn btn-primary mt-3">
                Continuar comprando
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} className={`mb-3 ${styles.cartItem}`}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} md={3} className="mb-3 mb-md-0">
                      <Image src={item.image} alt={item.name} className={styles.cartItemImage} fluid />
                    </Col>
                    <Col xs={12} md={4}>
                      <h5 className="mb-2">{item.name}</h5>
                      <p className="text-muted mb-0">Precio unitario: {formatPrice(item.price)}</p>
                    </Col>
                    <Col xs={12} md={2} className="my-3 my-md-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}>
                          <Dash />
                        </Button>
                        <span className={`mx-3 ${styles.quantity}`}>{item.quantity}</span>
                        <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id)}>
                          <Plus />
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={2} className="text-right">
                      <h5 className="mb-0">{formatPrice(item.price * item.quantity)}</h5>
                    </Col>
                    <Col xs={6} md={1} className="text-right">
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            <Card className={`mb-3 ${styles.cartTotal}`}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <h4>Total:</h4>
                <h4>{formatPrice(totalPrice)}</h4>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-between">
              <Button variant="outline-danger" className="mb-3" onClick={clearCart}>
                <Trash className="me-2" /> Vaciar Carrito
              </Button>
              <Button variant="primary" className="mb-3" onClick={handleProceedToPayment}>
                <CreditCard className="me-2" /> Proceder al Pago
              </Button>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;