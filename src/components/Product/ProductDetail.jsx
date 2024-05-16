import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (product) {
      axios.get(`http://localhost:3005/products/${product.id}/images`)
        .then(response => {
          const imageFileNames = response.data;
          const imageUrls = imageFileNames.map(fileName => `http://localhost:3005/images/${fileName}`);
          setProductImages(imageUrls);
        })
        .catch(error => {
          console.error('Error getting product images:', error);
        });
    }
  }, [product]);

  if (!product) {
    return <div className="product-detail-container">No se ha seleccionado ningún producto</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="row">
        <div className="col-md-6">
          <div className="image-container">
            {productImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Product ${index + 1}`} className="product-image" />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="details-container">
            <h2>{product.itemId}</h2>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Price (USD): ${product.priceUsd}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Guarantee: {product.guarantee}</p>
            <p>Currency: {product.currency}</p>
            <p>Tax: {product.tax}%</p>
            <p>Barcode: {product.barcode}</p>
            <p>Category ID: {product.categoryId}</p>
            <p>Category Name: {product.categoryName}</p>
            <p>Brand ID: {product.brandId}</p>
            <p>Brand Name: {product.brandName}</p>
            <p>Capacity ID: {product.capacityId}</p>
            <p>Capacity Name: {product.capacityName}</p>
            <p>Color ID: {product.colorId}</p>
            <p>Color Name: {product.colorName}</p>
            <p>SubCategory ID: {product.subcategoryId}</p>
            <p>SubCategory Name: {product.subcategoryName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;