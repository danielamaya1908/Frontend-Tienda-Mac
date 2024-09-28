import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Trash, Dash, Plus, Cart as CartIcon, CreditCard } from 'react-bootstrap-icons';
import axios from 'axios';
import LoginUser from '../Login/LoginUser';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, updateQuantity } = useCart();
  const [productImages, setProductImages] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  const [showLoginUser, setShowLoginUser] = useState(false);
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState('/cart');
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleProceedToPayment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate('/payment-methods', { 
        state: { 
          totalAmount: totalPrice,
          userId: user ? user.id : null
        } 
      });
    } else {
      setRedirectAfterLogin('/cart');
      setShowLoginUser(true);
    }
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLoginUser(false);
    navigate(redirectAfterLogin);
  };

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const imageRequests = cartItems.map(async (item) => {
          try {
            const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${item.id}/images`);
            const imageFileNames = response.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            return { [item.id]: imageUrls };
          } catch (error) {
            console.error(`Error getting images for product ${item.id}:`, error);
            return { [item.id]: [] };
          }
        });

        const images = await Promise.all(imageRequests);
        const imagesMap = images.reduce((acc, imageObj) => ({ ...acc, ...imageObj }), {});
        setProductImages(imagesMap);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    fetchProductImages();
  }, [cartItems]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsPromises = cartItems.map(item =>
          axios.get(`https://backend-tienda-mac-production.up.railway.app/product/${item.id}`)
        );
        const responses = await Promise.all(detailsPromises);
        const quantities = responses.reduce((acc, response) => {
          acc[response.data.id] = response.data.quantity;
          return acc;
        }, {});
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    const maxQuantity = productQuantities[itemId] || 1;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (showLoginUser) {
    return (
      <div>
        <Navbar />
        <LoginUser 
          onLoginSuccess={handleLoginSuccess} 
          onClose={() => setShowLoginUser(false)} 
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.cartPage} style={{ paddingTop: '60px' }}>
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
                      {productImages[item.id] && productImages[item.id][0] ? (
                        <Image
                          src={productImages[item.id][0]} 
                          alt={item.name} 
                          className={styles.cartItemImage} 
                          fluid 
                        />
                      ) : (
                        <Image
                          src="ruta/a/imagen/default.jpg" 
                          alt={item.name}
                          className={styles.cartItemImage}
                          fluid
                        />
                      )}
                    </Col>
                    <Col xs={12} md={4}>
                      <h5 className="mb-2">{item.name}</h5>
                      <p className="text-muted mb-0">Precio unitario: {formatPrice(item.price)}</p>
                    </Col>
                    <Col xs={12} md={2} className="my-3 my-md-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Dash />
                        </Button>
                        <span className={`mx-3 ${styles.quantity}`}>{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (productQuantities[item.id] || 1)}
                        >
                          <Plus />
                        </Button>
                      </div>
                      <p className="text-muted mt-2 mb-0">Disponibles: {productQuantities[item.id] || 'Cargando...'}</p>
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
            <div className="d-flex justify-content-center">
              <Button variant="primary" size="lg" onClick={handleProceedToPayment} disabled={cartItems.length === 0}>
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