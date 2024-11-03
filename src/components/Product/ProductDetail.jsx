import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProductImages = async () => {
      if (product) {
        try {
          const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
          // Convertir las imágenes a formato base64
          const base64Images = imageResponse.data.map(image => `data:image/jpeg;base64,${image.data}`);
          setImages(base64Images);
        } catch (error) {
          console.error('Error getting product images:', error);
        }
      }
    };

    fetchProductImages();
  }, [product]);

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

  if (!product) {
    return <div className="product-detail-container">No se ha seleccionado ningún producto</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="row">
        <div className="col-md-6">
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
        <div className="col-md-6">
          <div className="details-container">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-info">
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Price (USD):</strong> ${product.priceUsd}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Guarantee:</strong> {product.guarantee}</p>
              <p><strong>Currency:</strong> {product.currency}</p>
              <p><strong>Tax:</strong> {product.tax}%</p>
              <p><strong>Barcode:</strong> {product.barcode}</p>
              <p><strong>Category:</strong> {product.categoryName} (ID: {product.categoryId})</p>
              <p><strong>Brand:</strong> {product.brandName} (ID: {product.brandId})</p>
              <p><strong>Capacity:</strong> {product.capacityName} (ID: {product.capacityId})</p>
              <p><strong>Color:</strong> {product.colorName} (ID: {product.colorId})</p>
              <p><strong>SubCategory:</strong> {product.subcategoryName} (ID: {product.subcategoryId})</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;