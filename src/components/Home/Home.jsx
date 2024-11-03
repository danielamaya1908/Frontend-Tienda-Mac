import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Footer from '../Footer/Footer';
import Slideshow from './Slideshow';
import SubNavbar from '../SubNavbar/SubNavbar';
import styles from './Home.module.css';
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

  // Función optimizada para pre-cargar imágenes
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  // Función optimizada para fetch de imágenes con cache
  const fetchProductImages = async (products, setImageState) => {
    const imageCache = new Map();
    
    const fetchImage = async (productId) => {
      if (imageCache.has(productId)) {
        return imageCache.get(productId);
      }

      try {
        const imageResponse = await axios.get(
          `https://backend-tienda-mac-production.up.railway.app/products/${productId}/images`,
          { responseType: 'arraybuffer' }
        );
        
        const base64String = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        const imageUrl = `data:image/jpeg;base64,${base64String}`;
        imageCache.set(productId, [imageUrl]);
        
        // Pre-cargar la imagen
        await preloadImage(imageUrl);
        
        return [imageUrl];
      } catch (error) {
        console.error(`Error loading image for product ${productId}:`, error);
        return [];
      }
    };

    // Procesar imágenes en grupos de 5 para no sobrecargar
    const batchSize = 5;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchPromises = batch.map(async (product) => {
        const images = await fetchImage(product.id);
        setImageState(prevState => ({
          ...prevState,
          [product.id]: images
        }));
      });
      
      await Promise.all(batchPromises);
    }
  };

  // Optimizar los useEffect para cargar en paralelo
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Array con todas las rutas de accesorios
        const accessoryRoutes = [
          'Accesorios%20de%20TV/subcategory/Controles%20remotos',
          'Accesorios%20de%20carga/subcategory/Cargador%20MagSafe',
          'Audífonos/subcategory/Audífonos%20de%20cable',
          'Adaptadores/subcategory/Adaptador%20VGA',
          'Adaptadores/subcategory/Adaptador%20de%20audio',
          'Accesorios%20de%20computación/subcategory/Mouse',
          'Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20magnetica',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%204%20puertos%20USB',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%202%20puertos%20USB%20para%20Coche%20+%20Cable%20Lightning%20a%20USB',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20USB%20+%20cable%20lightning',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20de%202%20puertos%20con%20cable%20usb-a%20con%20conector%20lightning',
          'Accesorios%20de%20carga/subcategory/Cargador%20dual-USB-A%20para%20coche',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20dual%20USB-C+%20USB-A',
          'Accesorios%20de%20carga/subcategory/Cargador%20Universal%20para%20coche',
          'Accesorios%20de%20carga/subcategory/Soporte%20de%20viaje%20para%20el%20cable%20de%20carga%20y%20el%20%20Apple%20Watch',
          'Accesorios%20de%20carga/subcategory/Base%20de%20carga%202%20en%201%20para%20iPhone%20y%20Apple%20Watch',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning%20a%20USB',
          'Accesorios%20de%20carga/subcategory/Cargador%20Clip%20de%20puerto%20Lightning%20a%20USB',
          'Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-A%20a%20Lightning',
          'Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-C%20a%20Lightning',
          'Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB%20con%20Adaptador%20Lightning',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20pared',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20pared%20de%20puerto%20USB',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%20doble%20puerto%20USB-A',
          'Accesorios%20de%20carga/subcategory/Cargador%20de%204%20puertos',
          'Accesorios%20de%20carga/subcategory/Base%20de%20carga%20para%20iPhone%20y%20apple%20watch',
          'Accesorios%20de%20carga/subcategory/Soporte%20de%20carga%20inalámbrica%20para%20teléfonos',
          'Accesorios%20de%20video/subcategory/Adaptador%20USB-C%20a%20HDMI',
          'Accesorios%20de%20carga/subcategory/Bateria%20Portátil',
          'Accesorios%20de%20carga/subcategory/Batería%20externa,%20inalámbrica%20y%20magnética%20con%20soporte',
          'Accesorios%20de%20carga%20y%20navegación/subcategory/Soporte%20de%20carga%20para%20teléfono%20móvil%20+%20Navegación%20para%20automóvil',
          'Accesorios%20de%20carga%20para%20apple%20watch%20y%20iPhone/subcategory/Bateria%20portátil',
          'Cables%20de%20Audio%20y%20Video/subcategory/Cable%20HD-HDMI',
          'Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20+%20Estuche%20de%20seguridad',
          'Accesorios%20deportivos/subcategory/Banda%20de%20mano%20protectora%20para%20iPhone',
          'Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20para%20iPhone',
          'Accesorios%20de%20Audio%20o%20Sonido/subcategory/Audífonos%20para%20niños',
          'Accesorios%20de%20carro/subcategory/Soporte%20de%20carro%20para%20teléfono%20móvil',
          'Cables%20de%20imagen/subcategory/Adaptador%20Mini%20Displayport%20a%20VGA',
          'Cables%20de%20imagen/subcategory/Adaptador%20usb-c%20a%20Vga',
          'Accesorios%20de%20reloj/subcategory/Protector%20de%20pantalla%20para%20Apple%20Watch',
          'Accesorios%20de%20Grabación%20y%20soporte%20de%20teléfono/subcategory/Soporte%20magnético%20girable%20para%20grabación',
          'Accesorios%20de%20Audio%20o%20Sonido/subcategory/Cable%20de%20audio%20con%20conector%20lightning',
          'Accesorios%20de%20Audio%20o%20Sonido/subcategory/Distribuidor%20de%20audio',
          'Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20USB-C',
          'Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Llavero%20con%20puerto%20lightning%20a%20USB',
          'Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20Lightning%20a%20USB-C',
          'Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20Lightning'
        ];

        // Realizar todas las llamadas en paralelo
        const [accessoryResponses, newResponse, featuredResponse] = await Promise.all([
          Promise.all(
            accessoryRoutes.map(route => 
              axios.get(`https://backend-tienda-mac-production.up.railway.app/products/category/${route}`)
            )
          ),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/recent'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone')
        ]);

        // Procesar las respuestas
        const homeProds = accessoryResponses.flatMap(response => response.data);
        const newProds = newResponse.data.slice(0, 10);
        const featuredProds = featuredResponse.data.slice(0, 10);

        // Actualizar estados
        setHomeProducts(homeProds);
        setNewProducts(newProds);
        setFeaturedProducts(featuredProds);

        // Cargar imágenes en paralelo
        await Promise.all([
          fetchProductImages(homeProds, setProductImages),
          fetchProductImages(newProds, setNewProductImages),
          fetchProductImages(featuredProds, setFeaturedProductImages)
        ]);
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
    },
    preloadImages: false,
    lazy: true
  };

  const renderProductCard = (product, images) => (
    <div className="card h-100 border-0 shadow-sm" 
      style={{ maxWidth: '250px', margin: '0 auto', backgroundColor: 'white' }}>
      <div className="d-flex align-items-center justify-content-center" 
        style={{ height: '180px', width: '180px', margin: '0 auto', padding: '10px', overflow: 'hidden' }}>
        {images[product.id]?.[0] && (
          <img 
            src={images[product.id][0]}
            className="card-img-top img-fluid"
            alt={product.name}
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'translateZ(0)',
              willChange: 'transform',
              imageRendering: 'optimizeSpeed'
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
