import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import Slideshow from './Slideshow';
import SubNavbar from '../SubNavbar/SubNavbar';

const Home = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  // Implementar cache de imágenes
  const imageCache = useMemo(() => new Map(), []);

  // Función optimizada para cargar imágenes
  const fetchProductImages = async (products, category) => {
    const imageFetchPromises = products.map(async (product) => {
      // Verificar si la imagen ya está en caché
      if (imageCache.has(product.id)) {
        setProductImages(prev => ({
          ...prev,
          [product.id]: imageCache.get(product.id)
        }));
        return;
      }

      try {
        const imageResponse = await axios.get(
          `https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`,
          { responseType: 'arraybuffer' } // Solicitar datos binarios directamente
        );

        // Convertir arraybuffer a base64 de manera más eficiente
        const base64String = btoa(
          new Uint8Array(imageResponse.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        
        const imageUrl = `data:image/jpeg;base64,${base64String}`;
        
        // Guardar en caché
        imageCache.set(product.id, [imageUrl]);
        
        setProductImages(prev => ({
          ...prev,
          [product.id]: [imageUrl]
        }));
      } catch (error) {
        console.error(`Error loading image for product ${product.id}:`, error);
      }
    });

    await Promise.all(imageFetchPromises);
  };

  // Optimizar las peticiones usando AbortController
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchProducts = async () => {
      try {
        const [homeResponse, newResponse, featuredResponse] = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos', 
            { signal: abortController.signal }),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/recent',
            { signal: abortController.signal }),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone',
            { signal: abortController.signal })
        ]);

        setHomeProducts(homeResponse.data);
        setNewProducts(newResponse.data);
        setFeaturedProducts(featuredResponse.data);

        // Cargar imágenes en paralelo
        await Promise.all([
          fetchProductImages(homeResponse.data, 'home'),
          fetchProductImages(newResponse.data, 'new'),
          fetchProductImages(featuredResponse.data, 'featured')
        ]);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchProducts();

    return () => abortController.abort();
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

  const ProductCard = React.memo(({ product }) => {
    const images = productImages[product.id] || [];
    
    return (
      <div className="card h-100 border-0 shadow-sm" style={{ 
        maxWidth: '250px',
        margin: '0 auto', 
        backgroundColor: 'white' 
      }}>
        <div className="d-flex align-items-center justify-content-center" style={{ 
          height: '180px',
          width: '180px',
          margin: '0 auto',
          padding: '10px',
          overflow: 'hidden' 
        }}>
          {images[0] && (
            <img 
              src={images[0]}
              className="card-img-top img-fluid"
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease'
              }}
            />
          )}
        </div>
        <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between p-3">
          <h6 className="card-title text-truncate mb-2" style={{ fontSize: '1rem' }}>{product.name}</h6>
          <p className="card-text mb-3" style={{ fontSize: '0.9rem' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}
          </p>
          <a href={`/detalle-producto/${product.id}`} className="btn btn-primary">Comprar</a>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <div className="container-fluid py-5">
        <section className="mb-5">
          <h2 className="text-center mb-4">Productos Más Recientes</h2>
          <Swiper {...swiperParams}>
            {newProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mb-5">
          <SubNavbar />
          <Swiper {...swiperParams}>
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Accesorios</h2>
          <Swiper {...swiperParams}>
            {homeProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
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