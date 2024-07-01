import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import { useSwipeable } from 'react-swipeable';
import Footer from '../Footer/Footer';
import { Modal, Button } from 'react-bootstrap'; // Importa los componentes necesarios de Bootstrap
import './DetalleProducto.css';
import BuyModal from './BuyModal'; // Importa el componente modal que creaste

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/product/${id}`);
        setProduct(productResponse.data);

        const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${id}/images`);
        const imageFileNames = imageResponse.data;
        const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
        setImages(imageUrls);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleBuyButtonClick = () => {
    setShowModal(true); // Muestra el modal al hacer clic en "Comprar ahora"
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

  const closeModal = () => {
    setShowModal(false); // Oculta el modal
  };

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="no-product">No se encontró el producto.</div>;

  return (
    <div className="detalle-producto">
      <Navbar />
      <div className="container py-5 bg-light shadow-sm rounded position-relative">
        <h1 className="product-name product-center mb-4">{product.name}</h1>
        <div className="row">
          <div className="col-md-6">
            {images.length > 0 ? (
              <div id="productCarousel" className="carousel slide" data-bs-ride="carousel" {...handlers}>
                <div className="carousel-inner">
                  {images.map((image, index) => (
                    <div className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`} key={index}>
                      <img src={image} className="d-block w-100 img-carousel" alt={`${product.name} - Imagen ${index + 1}`} />
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
              </div>
            ) : (
              <p className="product-text">No hay imágenes disponibles para este producto.</p>
            )}
          </div>
          <div className="col-md-6">
            <h2 className="product-heading">Especificaciones</h2>
            <p className="product-specs"><strong>Almacenamiento Interno:</strong> {product.capacityName}</p>
            <p className="product-specs"><strong>Color:</strong> {product.colorName}</p>
            <p className="product-specs"><strong>Precio:</strong> {formatPrice(product.price)}</p>
            <div className="mb-3">
              <label htmlFor="quantity" className="product-label form-label">Cantidad:</label>
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
                  readOnly 
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
            <p className="product-text"><strong>Subtotal:</strong> {formatPrice(product.price * quantity)}</p>
            <button className="btn btn-primary btn-lg mt-3 w-100" onClick={handleBuyButtonClick}>Comprar ahora</button>
            <h3 className="product-heading mt-4">Descripción</h3>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
        <button 
          onClick={handleGoBack}
          className="btn btn-close-custom position-absolute top-0 end-0 m-3"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
      <Footer />
      {/* Renderiza el modal con los props necesarios */}
      <BuyModal show={showModal} onHide={closeModal} productName={product.name} />
    </div>
  );
};

export default DetalleProducto;
