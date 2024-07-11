import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer'; 
import { Link } from 'react-router-dom';

const AirpodsPro = () => {
  const [AirpodsProducts, setAirpodsProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchAirpodsProducts = async () => {
      try {
        const responses = await Promise.all([
            axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Audifonos/subcategory/Auriculares/name/AirPods%20Pro%20(2.ª generación)%20con%20estuche%20MagSafe%20(USB-C)')
        ]);                                                                                          
        const products = responses.flatMap(response => response.data);
        setAirpodsProducts(products);
        products.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            setProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching Airpods products:', error);
      }
    };
    fetchAirpodsProducts();
  }, []);



  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="Airpods-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Airpods Pro</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {AirpodsProducts.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100" style={{ width: '22rem' }}>
                <div className="card-img-top ratio ratio-16x9 border border-secondary rounded-top">
                  {productImages[product.id] && productImages[product.id][0] && (
                    <img src={productImages[product.id][0]} alt={`Product ${product.name}`} className="img-fluid rounded-top" />
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><strong>{product.name}</strong></h5>
                  <p className="card-text">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                  <p className="card-text">Color: <strong>{product.colorName}</strong></p>
                  <p className="card-text">Precio: <strong>{formatPrice(product.price)}</strong></p>
                  <div className="mt-auto d-flex justify-content-between">
                   <a href={`/detalle-producto/${product.id}`} className="btn btn-primary">
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AirpodsPro;


