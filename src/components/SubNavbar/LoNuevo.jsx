import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer'; 

const LoNuevo = () => {
  const [sonidoProducts, setsonidoProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchsonidoProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:3005/products/recent')
        ]);
        const products = responses.flatMap(response => response.data);
        setsonidoProducts(products);
        products.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`http://localhost:3005/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `http://localhost:3005/images/${fileName}`);
            setProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching sonido products:', error);
      }
    };
    fetchsonidoProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="sonido-products">
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Lo Nuevo</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {sonidoProducts.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="ratio ratio-16x9 bg-light border-bottom rounded-top overflow-hidden">
                  {productImages[product.id] && productImages[product.id][0] && (
                    <img src={productImages[product.id][0]} alt={`Product ${product.name}`} className="img-fluid rounded-top" />
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2"><strong>{product.name}</strong></h5>
                  <p className="card-text mb-1">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                  <p className="card-text mb-1">Color: <strong>{product.colorName}</strong></p>
                  <p className="card-text mb-3">Precio: <strong>{formatPrice(product.price)}</strong></p>
                  <a href={`/detalle-producto/${product.id}`} className="btn btn-primary mt-auto">Comprar</a>
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

export default LoNuevo;
