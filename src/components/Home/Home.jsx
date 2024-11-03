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

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20MagSafe'),
        ]);

        const products = responses.flatMap(response => response.data);
        setHomeProducts(products);

        await fetchProductImages(products, setProductImages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchHomeProducts();
  }, []);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/recent');
        const newProducts = response.data;
        setNewProducts(newProducts);

        await fetchProductImages(newProducts, setNewProductImages);
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone');
        const products = response.data;
        setFeaturedProducts(products);

        await fetchProductImages(products, setFeaturedProductImages);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const fetchProductImages = async (products, setImageState) => {
    const imageFetchPromises = products.map(async (product) => {
      try {
        const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
        const base64Images = imageResponse.data.map(image => `data:image/jpeg;base64,${image.data}`); // Cambia el tipo de imagen según sea necesario
        setImageState(prevState => ({ ...prevState, [product.id]: base64Images }));
      } catch (error) {
        console.error(`Error getting images for product ${product.id}:`, error);
      }
    });

    await Promise.all(imageFetchPromises);
  };

// Modificar el swiperParams
const swiperParams = {
  modules: [Navigation, Autoplay],
  spaceBetween: 20, // Reducido de 30
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

// Modificar el renderProductCard
const renderProductCard = (product, images) => (
  <div className="card h-100 border-0 shadow-sm" style={{ 
    maxWidth: '250px', // Reducido de 300px
    margin: '0 auto', 
    backgroundColor: 'white' 
  }}>
    <div className="d-flex align-items-center justify-content-center" style={{ 
      height: '180px', // Reducido de 200px
      width: '180px', // Añadido control de ancho
      margin: '0 auto', // Centrar el contenedor
      padding: '10px', // Añadir algo de padding
      overflow: 'hidden' 
    }}>
      <img 
        src={images[product.id]?.[0]} 
        className="card-img-top img-fluid" 
        alt={product.name} 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transition: 'transform 0.3s ease' // Añadir transición suave
        }}
      />
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
