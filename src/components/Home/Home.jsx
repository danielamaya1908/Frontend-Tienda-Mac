import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import Slideshow from './Slideshow';
import SubNavbar from '../SubNavbar/SubNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import soporteTecnico from '../../img/slidesShow/Servicio_Tecnico.jpg';
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

  const accessoryUrls = [
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Llavero%20con%20puerto%20lightning%20a%20USB',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20Lightning%20a%20USB-C',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20Lightning'
  ];

  const newProductUrls = [
    'https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Pro',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Pro%20Max',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Plus'
  ];

  const featuredUrls = [
    'https://backend-tienda-mac-production.up.railway.app/products/recent',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Parlantes/subcategory/Parlante%20Portátil',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20audio/subcategory/Auriculares%20intraaurales%20de%20cable',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20audio/subcategory/Bocinas%20portátil',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20audio/subcategory/Audífonos%20diademas',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/MacBook',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/Mac%20studio',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/Mac%20mini',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/iMac'
  ];

  const fetchImagesForProduct = async (product, setImageState) => {
    try {
      const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
      if (imageResponse.data && imageResponse.data.length > 0) {
        const base64Images = imageResponse.data
          .map(image => image?.data ? `data:image/jpeg;base64,${image.data}` : null)
          .filter(Boolean);
        
        if (base64Images.length > 0) {
          setImageState(prevState => ({ ...prevState, [product.id]: base64Images }));
        }
      }
    } catch (error) {
      console.error(`Error getting images for product ${product.id}:`, error);
    }
  };

  const fetchImages = async (products, setImageState) => {
    products.forEach(product => {
      fetchImagesForProduct(product, setImageState);
    });
  };

  const interleaveProducts = (productsArrays) => {
    const maxProductsPerModel = Math.ceil(40 / productsArrays.length);
    const result = [];
    let index = 0;
    
    const limitedArrays = productsArrays.map(array => array.slice(0, maxProductsPerModel));
    
    const maxLength = Math.min(
      Math.max(...limitedArrays.map(arr => arr.length)),
      maxProductsPerModel
    );

    while (result.length < 40 && index < maxLength) {
      for (let arrayIndex = 0; arrayIndex < limitedArrays.length; arrayIndex++) {
        if (limitedArrays[arrayIndex][index]) {
          result.push(limitedArrays[arrayIndex][index]);
        }
      }
      index++;
    }

    return result.slice(0, 40);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [accessoryResponses, newProductResponses, featuredResponses] = await Promise.all([
          Promise.all(accessoryUrls.map(url => axios.get(url))),
          Promise.all(newProductUrls.map(url => axios.get(url))),
          Promise.all(featuredUrls.map(url => axios.get(url)))
        ]);

        const iPhoneProducts = interleaveProducts(
          newProductResponses.map(response => response.data)
        );

        const allAccessories = interleaveProducts(
          accessoryResponses.map(response => response.data)
        );

        const featured = interleaveProducts(
          featuredResponses.map(response => response.data)
        );

        setHomeProducts(allAccessories);
        setNewProducts(iPhoneProducts);
        setFeaturedProducts(featured);

        fetchImages(allAccessories, setProductImages);
        fetchImages(iPhoneProducts, setNewProductImages);
        fetchImages(featured, setFeaturedProductImages);

      } catch (error) {
        console.error('Error fetching data:', error);
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
        width: '220px',
        height: '380px',
        margin: '0 auto', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          height: '200px',
          padding: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div style={{
            border: '1px solid #000000',
            borderRadius: '4px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
          }}>
            <LazyLoadImage
              src={hasValidImage ? productImages[0] : '/placeholder-image.jpg'}
              alt={product.name}
              effect="opacity"
              style={{ 
                maxWidth: '100%',
                maxHeight: '150px',
                objectFit: 'contain',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
        </div>
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h6 className="card-title text-truncate mb-2" style={{ 
              fontSize: '0.9rem',
              lineHeight: '1.2',
              height: '2.4em',
              overflow: 'hidden'
            }}>{product.name}</h6>
            {product.capacityName && (
              <p className="card-text mb-2" style={{ fontSize: '0.8rem', color: '#000000' }}>
                <strong>Capacidad:</strong> {product.capacityName}
              </p>
            )}
          </div>
          <div>
            <p className="card-text mb-2" style={{ 
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
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

  const supportWhatsappUrl = "https://api.whatsapp.com/send?phone=573173026445&text=Hola,%20quisiera%20obtener%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20soporte%20t%C3%A9cnico.%20Tengo%20un%20equipo%20que%20necesita%20revisi%C3%B3n%20y%20me%20gustar%C3%ADa%20conocer%20los%20detalles%20del%20proceso,%20costos,%20y%20tiempos%20de%20reparaci%C3%B3n.%20Agradezco%20su%20respuesta.";

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

        <section className="mb-5">
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <a 
              href={supportWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textDecoration: 'none'
              }}
            >
              <img
                src={soporteTecnico}
                alt="Soporte Técnico"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;