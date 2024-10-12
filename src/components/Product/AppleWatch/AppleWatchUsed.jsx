import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar'; // Asegúrate de que la ruta sea correcta
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const AppleWatchUsed = () => {
  const [AppleWatchProducts, setAppleWatchProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchAppleWatchProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartwatches%20y%20accesorios/subcategory/Smartwatches/name/Apple%20Watch%20Series%207');
        const products = response.data;
        setAppleWatchProducts(products);

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
        console.error('Error fetching AppleWatch products:', error);
      }
    };

    fetchAppleWatchProducts();
  }, []);



  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="AppleWatch-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4 fs-4">Apple Watch Usados</h1>
        <h2 className="text-center mb-4 fs-4" style={{ color: 'black' }}>Productos no disponibles en el momento</h2>
        {/* Sección comentada para productos no disponibles */}
        {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {AppleWatchProducts.map((product) => (
            <div className="col" key={product.id}>
              <a href={`/detalle-producto/${product.id}`} className="text-decoration-none">
                <div className="card h-100 small-card">
                  <div className="card-img-top ratio ratio-16x9 border border-secondary rounded-top">
                    {productImages[product.id] && productImages[product.id][0] && (
                      <img src={productImages[product.id][0]} alt={`Product ${product.name}`} className="img-fluid rounded-top" />
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h5>
                    <p className="card-text fs-7 text-truncate">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                    <p className="card-text fs-7 text-truncate">Color: <strong>{product.colorName}</strong></p>
                    <p className="card-text fs-7 text-truncate">Precio: <strong>{formatPrice(product.price)}</strong></p>
                    <div className="mt-auto d-flex justify-content-between">
                      <span className="btn btn-primary btn-sm">Comprar</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default AppleWatchUsed;

