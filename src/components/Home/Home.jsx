import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import Slideshow from './Slideshow';
import SubNavbar from '../SubNavbar/SubNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Home = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [newProductImages, setNewProductImages] = useState({});
  const [featuredProductImages, setFeaturedProductImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Array de URLs de categorías de accesorios
  const accessoryUrls = [
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20MagSafe',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20reloj/subcategory/Protector%20de%20pantalla%20para%20Apple%20Watch',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Grabación%20y%20soporte%20de%20teléfono/subcategory/Soporte%20magnético%20girable%20para%20grabación',
    // Puedes agregar más URLs aquí
  ];

  const fetchImagesBatch = async (products, setImageState, batchSize = 5) => {
    const batches = [];
    for (let i = 0; i < products.length; i += batchSize) {
      batches.push(products.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const imageFetchPromises = batch.map(async (product) => {
        try {
          const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
          if (imageResponse.data && imageResponse.data.length > 0) {
            const base64Images = imageResponse.data.map(image => {
              // Verificar si la imagen tiene datos válidos
              if (image && image.data) {
                return `data:image/jpeg;base64,${image.data}`;
              }
              return null;
            }).filter(img => img !== null); // Filtrar imágenes nulas
            
            if (base64Images.length > 0) {
              setImageState(prevState => ({ ...prevState, [product.id]: base64Images }));
            }
          }
        } catch (error) {
          console.error(`Error getting images for product ${product.id}:`, error);
        }
      });

      await Promise.all(imageFetchPromises);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch de productos de accesorios
        const accessoryResponses = await Promise.all(
          accessoryUrls.map(url => axios.get(url))
        );
        const allAccessories = accessoryResponses.flatMap(response => response.data);
        
        // Fetch de nuevos productos y productos destacados
        const [newProductsResponse, featuredResponse] = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/recent'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone')
        ]);

        const newProds = newProductsResponse.data.slice(0, 10);
        const featured = featuredResponse.data.slice(0, 10);

        setHomeProducts(allAccessories);
        setNewProducts(newProds);
        setFeaturedProducts(featured);

        // Cargar imágenes en lotes
        await Promise.all([
          fetchImagesBatch(allAccessories, setProductImages),
          fetchImagesBatch(newProds, setNewProductImages),
          fetchImagesBatch(featured, setFeaturedProductImages)
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const swiperParams = {
    modules: [Navigation, Autoplay],
    spaceBetween: 20,
    slidesPerView: 4,
    navigation: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 2, spaceBetween: 15 },
      640: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 20 }
    }
  };

const renderProductCard = (product, images) => {
  const productImages = images[product.id] || [];
  const hasValidImage = productImages.length > 0;

  return (
    <div className="card border-0 shadow-sm" style={{ 
      width: '220px',  // Ancho fijo para todas las cards
      height: '340px', // Altura fija para todas las cards
      margin: '0 auto', 
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        height: '200px',       // Altura fija para el contenedor de la imagen
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {hasValidImage ? (
          <LazyLoadImage
            src={productImages[0]}
            alt={product.name}
            effect="blur"
            style={{ 
              maxWidth: '100%',
              maxHeight: '170px',    // Altura máxima para la imagen
              objectFit: 'contain',
              transition: 'transform 0.2s ease'
            }}
            placeholder={
              <div className="placeholder-glow w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            }
            error={
              <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-light">
                <span className="text-muted">Imagen no disponible</span>
              </div>
            }
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-light">
            <span className="text-muted">Imagen no disponible</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column justify-content-between p-3">
        <h6 className="card-title text-truncate mb-2" style={{ 
          fontSize: '0.9rem',
          lineHeight: '1.2',
          height: '2.4em',    // Altura fija para el título (2 líneas)
          overflow: 'hidden'
        }}>{product.name}</h6>
        <div>
          <p className="card-text mb-2" style={{ fontSize: '0.9rem' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}
          </p>
          <a href={`/detalle-producto/${product.id}`} 
             className="btn btn-primary w-100">
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
};

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <div className="container-fluid py-5">
        <section className="mb-5">
          <h2 className="text-center mb-4">Productos Más Recientes</h2>
          <Swiper {...swiperParams}>
            {newProducts.map((product) => (
              <SwiperSlide key={product.id}>
                {renderProductCard(product, newProductImages)}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mb-5">
          <SubNavbar />
          <Swiper {...swiperParams}>
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                {renderProductCard(product, featuredProductImages)}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Accesorios</h2>
          <Swiper {...swiperParams}>
            {homeProducts.map((product) => (
              <SwiperSlide key={product.id}>
                {renderProductCard(product, productImages)}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;