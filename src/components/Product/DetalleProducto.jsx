import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import { useSwipeable } from 'react-swipeable';
import Footer from '../Footer/Footer';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

   useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/product/${id}`);
        setProduct(productResponse.data);

        const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${id}/images`);
        // Convertir las imágenes a formato base64
        const base64Images = imageResponse.data.map(image => `data:image/jpeg;base64,${image.data}`);
        setImages(base64Images);

        setMaxQuantity(productResponse.data.quantity || 1);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error al cargar los detalles del producto. Por favor, intente de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const { description, technicalSpecs, warranty, boxContents } = useMemo(() => {
    if (!product || !product.description) return { description: '', technicalSpecs: '', warranty: '', boxContents: '' };

    const fullText = product.description;

    const characteristicsIndex = fullText.indexOf('Características');
    const contentsIndex = fullText.indexOf('Contenido de la caja');
    const warrantyIndex = fullText.indexOf('Garantía');

    return {
      description: fullText.slice(0, characteristicsIndex).trim(),
      technicalSpecs: fullText.slice(characteristicsIndex, contentsIndex).trim(),
      boxContents: fullText.slice(contentsIndex, warrantyIndex).trim(),
      warranty: fullText.slice(warrantyIndex).trim(),
    };
  }, [product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: maxQuantity }, quantity);
    navigate('/cart');
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="no-product">No se encontró el producto.</div>;

  return (
    <div className="detalle-producto">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-5 shadow-sm rounded position-relative"
        style={{ backgroundColor: 'white' }}
      >
        <button
          className="btn btn-close position-absolute"
          onClick={handleGoBack}
          aria-label="Cerrar"
          style={{ top: '15px', right: '15px' }}
        ></button>
        <h1 className="product-name product-center mb-4">{product.name}</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            {images.length > 0 ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                id="productCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                {...handlers}
              >
                <div className="carousel-inner">
                  {images.map((image, index) => (
                    <div className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`} key={index}>
                      <img
                        src={image}
                        className="d-block w-100 img-carousel"
                        alt={`${product.name} - Imagen ${index + 1}`}
                        style={{ objectFit: 'contain', height: '400px' }}
                      />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" onClick={prevImage}>
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" onClick={nextImage}>
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </motion.div>
            ) : (
              <p className="product-text">No hay imágenes disponibles para este producto.</p>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-md-6"
          >
            <div className="product-info mb-4">
              <h2 className="product-heading">Especificaciones</h2>
              <p className="product-specs"><strong>Almacenamiento Interno:</strong> {product.capacityName}</p>
              <p className="product-specs"><strong>Color:</strong> {product.colorName}</p>
              <p className="product-specs"><strong>Precio:</strong> {formatPrice(product.price)}</p>
            </div>
            <div className="quantity-selector mb-3">
              <label htmlFor="quantity" className="product-label form-label" style={{ color: "black" }}>
                Cantidad:
              </label>
              <div className="input-group">
                <button
                  className={`btn btn-outline-secondary ${quantity <= 1 ? 'disabled' : ''}`}
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center cantidad-input"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= maxQuantity) {
                      setQuantity(newQuantity);
                    }
                  }}
                  min="1"
                  max={maxQuantity}
                  style={{ color: "black" }} // Cambiar el color del texto del input a negro
                />

                <button
                  className={`btn btn-outline-secondary ${quantity >= maxQuantity ? 'disabled' : ''}`}
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(prev + 1, maxQuantity))}
                >
                  +
                </button>
              </div>
            </div>
            <p className="product-text">Disponibles: {maxQuantity}</p>
            <p className="product-text"><strong>Subtotal:</strong> {formatPrice(product.price * quantity)}</p>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>Agregar al carrito</button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4"
        >
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Descripción
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Características
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'boxContents' ? 'active' : ''}`}
                onClick={() => setActiveTab('boxContents')}
              >
                Contenido de la caja
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'warranty' ? 'active' : ''}`}
                onClick={() => setActiveTab('warranty')}
              >
                Garantía
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3">
            {activeTab === 'description' && (
              <div className="tab-pane fade show active">
                <p>{description}</p>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="tab-pane fade show active">
                <p>{technicalSpecs}</p>
              </div>
            )}
            {activeTab === 'boxContents' && (
              <div className="tab-pane fade show active">
                <p>{boxContents}</p>
              </div>
            )}
            {activeTab === 'warranty' && (
              <div className="tab-pane fade show active">
                <p>{warranty}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default DetalleProducto;