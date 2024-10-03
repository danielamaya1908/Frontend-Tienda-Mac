import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // Estado para la pestaña activa

  useEffect(() => {
    if (product) {
      axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`)
        .then(response => {
          const imageFileNames = response.data;
          const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
          setProductImages(imageUrls);
        })
        .catch(error => {
          console.error('Error getting product images:', error);
        });
    }
  }, [product]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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
          <div className="image-container">
            {productImages.slice(0, 10).map((imageUrl, index) => (
              <div key={index} className="image-wrapper">
                <img
                  src={imageUrl}
                  alt={`Product ${index + 1}`}
                  className="product-image"
                  onClick={() => handleImageClick(imageUrl)}
                />
              </div>
            ))}
          </div>
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

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="Enlarged" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
