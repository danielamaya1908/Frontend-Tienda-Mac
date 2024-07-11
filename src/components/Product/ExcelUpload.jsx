import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [fileProducts, setFileProducts] = useState(null);
  const [fileImages, setFileImages] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [imagesError, setImagesError] = useState(null);

  const handleFileChangeProducts = (e) => {
    setFileProducts(e.target.files[0]);
  };

  const handleFileChangeImages = (e) => {
    setFileImages(e.target.files[0]);
  };

  const handleSubmitProducts = async (e) => {
    e.preventDefault();
    if (fileProducts) {
      const formData = new FormData();
      formData.append('file', fileProducts);
      try {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/postExcelProducts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from server (Products):', response.data);
        setFileProducts(null);
        e.target.reset();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('Error: Uno o más productos ya existen en la base de datos');
        } else {
          console.error('Error uploading Excel file (Products):', error);
        }
      }
    }
  };
  
  const handleSubmitImages = async (e) => {
    e.preventDefault();
    if (fileImages) {
      const formData = new FormData();
      formData.append('file', fileImages);
      try {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/postExcelImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from server (Images):', response.data);
        setFileImages(null);
        setImagesError(null);
        e.target.reset();
      } catch (error) {
        console.error('Error uploading Excel file (Images):', error);
        if (error.response) {
          setImagesError(error.response.data.message);
        } else {
          setImagesError('Error uploading file');
        }
      }
    }
  };

  return (
    <div>
      <h2>Agregar Excel de Productos</h2>
      {productsError && <p style={{ color: 'red' }}>{productsError}</p>}
      <form onSubmit={handleSubmitProducts}>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChangeProducts} />
          <button type="submit" style={{ marginLeft: '10px' }}>Subir (Productos)</button>
        </div>
      </form>
      <br />
      <h2>Agregar Excel de Imágenes</h2>
      {imagesError && <p style={{ color: 'red' }}>{imagesError}</p>}
      <form onSubmit={handleSubmitImages}>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChangeImages} />
          <button type="submit" style={{ marginLeft: '10px' }}>Subir (Imágenes)</button>
        </div>
      </form>
    </div>
  );
};

export default ExcelUpload;