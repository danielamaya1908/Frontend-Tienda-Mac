import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchComponent.css';

const SearchComponent = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState({});
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      handleSearch(controller.signal);
    }, 400);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchTerm]);

  // Manejar la búsqueda
  const handleSearch = async (signal) => {
    try {
      const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/search?query=${searchTerm}`, { signal });
      setSearchResults(response.data);
      setProductImages({});

      const imageRequests = response.data.map(async (product) => {
        try {
          const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`, { signal });
          const imageFileNames = imageResponse.data;
          const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
          return { id: product.id, urls: imageUrls };
        } catch (error) {
          if (error.name !== 'CanceledError') {
            console.error(`Error al obtener imágenes para el producto ${product.id}:`, error);
          }
          return { id: product.id, urls: [] };
        }
      });

      const images = await Promise.all(imageRequests);
      const imageMap = images.reduce((acc, { id, urls }) => ({ ...acc, [id]: urls }), {});
      setProductImages(imageMap);

    } catch (error) {
      if (error.name !== 'CanceledError') {
        console.error('Error al obtener los resultados de búsqueda:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Cerrar la búsqueda al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="search-overlay">
      <div className="search-component-fullscreen" ref={searchContainerRef}>
        <div className="search-header">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleInputChange}
              className="search-input"
              autoFocus
            />
            <button className="search-button">Buscar</button>
          </div>
          <button onClick={onClose} className="close-button">X</button>
        </div>

        {loading ? (
          <p className="loading" style={{ color: 'white', fontSize: '18px', textAlign: 'center', animation: 'fade 1.5s infinite' }}>Buscando...</p>
        ) : (
          <div className="search-results-container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {searchResults.map((product) => (
                <div className="col" key={product.id}>
                  <Link to={`/detalle-producto/${product.id}`} className="text-decoration-none">
                    <div className="card h-100 small-card">
                      <div className="card-img-top d-flex justify-content-center align-items-center" style={{ height: '250px', padding: '10px' }}>
                        {productImages[product.id] && productImages[product.id][0] ? (
                          <img 
                            src={productImages[product.id][0]} 
                            alt={`Product ${product.name}`} 
                            className="img-fluid" 
                            style={{ maxHeight: '230px', maxWidth: '100%', objectFit: 'contain' }}
                            loading="lazy"
                          />
                        ) : (
                          <span className="placeholder-img">Imagen no disponible</span>
                        )}
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h5>
                        <p className="card-text fs-7">Almacenamiento Interno: <strong>{product.capacityName}</strong></p>
                        <p className="card-text fs-7">Color: <strong>{product.colorName}</strong></p>
                        <p className="card-text fs-7">Precio: <strong>{formatPrice(product.price)}</strong></p>
                        <div className="mt-auto d-flex justify-content-between">
                          <span className="btn btn-primary btn-sm">Comprar</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
