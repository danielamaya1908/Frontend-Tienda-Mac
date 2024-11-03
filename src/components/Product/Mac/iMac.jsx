import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';

const iMac = () => {
  const [macProducts, setMacProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchMacProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/iMac');
        const products = response.data;
        setMacProducts(products);
        
        // Fetch images for all products
        await fetchProductImages(products);
      } catch (error) {
        console.error('Error fetching Mac products:', error);
      }
    };

    fetchMacProducts();
  }, []);

  const fetchProductImages = async (products) => {
    const imageFetchPromises = products.map(async (product) => {
      try {
        const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
        const base64Images = imageResponse.data.map(image => `data:image/jpeg;base64,${image.data}`);
        setProductImages(prevState => ({
          ...prevState,
          [product.id]: base64Images
        }));
      } catch (error) {
        console.error(`Error getting images for product ${product.id}:`, error);
      }
    });

    await Promise.all(imageFetchPromises);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="mac-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4 fs-4" style={{ color: 'black' }}>iMac</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {macProducts.map((product) => (
            <div className="col" key={product.id}>
              <Link to={`/detalle-producto/${product.id}`} className="text-decoration-none">
                <div className="card h-100 small-card">
                  <div className="card-img-top d-flex justify-content-center align-items-center" style={{ height: '250px', padding: '10px' }}>
                    {productImages[product.id] && productImages[product.id][0] && (
                      <img
                        src={productImages[product.id][0]}
                        alt={`Product ${product.name}`}
                        className="img-fluid"
                        style={{ maxHeight: '230px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h5>
                    <p className="card-text fs-7">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                    <p className="card-text fs-7">Color: <strong>{product.colorName}</strong></p>
                    <p className="card-text fs-7">Precio: <strong>{formatPrice(product.price)}</strong></p>
                    <div className="mt-auto d-flex justify-content-between">
                      <Link to={`/detalle-producto/${product.id}`} className="btn btn-primary btn-sm">
                        Comprar
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default iMac;