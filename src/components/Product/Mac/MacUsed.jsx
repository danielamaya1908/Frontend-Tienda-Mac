import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import Footer from '../../Footer/Footer';

const MacUsed = () => {
  const [MacProducts, setMacProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchMacProducts = async () => {
      try {
        const response = await axios.get('');
        const products = response.data;
        setMacProducts(products);

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
        console.error('Error fetching Mac products:', error);
      }
    };

    fetchMacProducts();
  }, []);



  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="Mac-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Mac Usadas</h1>
        <h2 className="text-center mb-4 fs-4" style={{ color: 'black' }}>Productos no dispnibles en el momento</h2>
        {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {MacProducts.map((product) => (
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
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default MacUsed;

