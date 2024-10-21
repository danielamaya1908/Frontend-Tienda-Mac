import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import Slideshow from './Slideshow';
import SubNavbar from '../SubNavbar/SubNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// Configuración global de axios
axios.defaults.withCredentials = false;
axios.defaults.headers.common['Cache-Control'] = 'no-store';
axios.defaults.headers.common['Pragma'] = 'no-cache';

// Suprimir advertencias de consola
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  if (!args[0]?.includes?.('Chrome is moving')) {
    originalConsoleWarn.apply(console, args);
  }
};

console.error = (...args) => {
  if (!args[0]?.includes?.('Chrome is moving')) {
    originalConsoleError.apply(console, args);
  }
};

const Home = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [newProductImages, setNewProductImages] = useState({});
  const [featuredProductImages, setFeaturedProductImages] = useState({});

  // Función helper para obtener imágenes
  const fetchProductImages = async (product, setImageState) => {
    try {
      const response = await axios.get(
        `https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
          },
        }
      );

      const imageFileNames = response.data;
      const imageUrls = imageFileNames.map(fileName => 
        `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`
      );

      setImageState(prev => ({
        ...prev,
        [product.id]: imageUrls
      }));
    } catch (error) {
      setImageState(prev => ({
        ...prev,
        [product.id]: ['/placeholder-image.jpg']
      }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchHomeProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos'),
          // ... resto de tus llamadas axios.get
        ].map(request => 
          request.catch(error => ({ data: [] }))
        ));

        if (!isMounted) return;

        const products = responses.flatMap(response => response.data);
        setHomeProducts(products);

        // Procesar imágenes en grupos pequeños
        const chunkSize = 5;
        for (let i = 0; i < products.length; i += chunkSize) {
          if (!isMounted) return;
          const chunk = products.slice(i, i + chunkSize);
          await Promise.all(
            chunk.map(product => fetchProductImages(product, setProductImages))
          );
        }
      } catch (error) {
        if (isMounted) {
          setHomeProducts([]);
        }
      }
    };

    fetchHomeProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(
          'https://backend-tienda-mac-production.up.railway.app/products/recent',
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
            }
          }
        );

        if (!isMounted) return;

        const products = response.data;
        setNewProducts(products);

        await Promise.all(
          products.map(product => fetchProductImages(product, setNewProductImages))
        );
      } catch (error) {
        if (isMounted) {
          setNewProducts([]);
        }
      }
    };

    fetchNewProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          'https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone',
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
            }
          }
        );

        if (!isMounted) return;

        const products = response.data;
        setFeaturedProducts(products);

        await Promise.all(
          products.map(product => fetchProductImages(product, setFeaturedProductImages))
        );
      } catch (error) {
        if (isMounted) {
          setFeaturedProducts([]);
        }
      }
    };

    fetchFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);
  
  const swiperParams = {
    modules: [Navigation, Autoplay],
    spaceBetween: 30,
    slidesPerView: 4,
    navigation: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 30 },
      768: { slidesPerView: 4, spaceBetween: 40 }
    }
  };

  const renderProductCard = (product, images) => (
    <div className="card h-100 border-0 shadow-sm" style={{ maxWidth: '300px', margin: '0 auto', backgroundColor: 'white' }}>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '200px', overflow: 'hidden' }}>
        <img src={images[product.id]?.[0]} className="card-img-top img-fluid" alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between p-3">
        <h6 className="card-title text-truncate mb-2" style={{ fontSize: '1.1rem' }}>{product.name}</h6>
        <p className="card-text mb-3" style={{ fontSize: '1rem' }}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</p>
        <a href={`/detalle-producto/${product.id}`} className="btn btn-primary">Comprar</a>
      </div>
    </div>
  );

  // Estilo en línea para ocultar los puntos de paginación
  const hidePaginationStyle = `
    .swiper-pagination-bullets {
      display: none !important;
    }
  `;

  return (
    <div className={styles.homeContainer}>
      <style>{hidePaginationStyle}</style>
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