import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const AccessoriesSection = () => {
  const [accessories, setAccessories] = useState([]);
  const [accessoryImages, setAccessoryImages] = useState({});

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const [
          airpods,
          cases,
          chargers,
          cables
        ] = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20MagSafe'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Audífonos/subcategory/Audífonos%20de%20cable'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Adaptadores/subcategory/Adaptador%20VGA'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Adaptadores/subcategory/Adaptador%20de%20audio'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20computación/subcategory/Mouse'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20magnetica'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%204%20puertos%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%202%20puertos%20USB%20para%20Coche%20+%20Cable%20Lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20USB%20+%20cable%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20de%202%20puertos%20con%20cable%20usb-a%20con%20conector%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20dual-USB-A%20para%20coche'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20dual%20USB-C+%20USB-A'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20Universal%20para%20coche'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Soporte%20de%20viaje%20para%20el%20cable%20de%20carga%20y%20el%20%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Base%20de%20carga%202%20en%201%20para%20iPhone%20y%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20Clip%20de%20puerto%20Lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-A%20a%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-C%20a%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB%20con%20Adaptador%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20pared'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20pared%20de%20puerto%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%20doble%20puerto%20USB-A'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%204%20puertos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Base%20de%20carga%20para%20iPhone%20y%20apple%20watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Soporte%20de%20carga%20inalámbrica%20para%20teléfonos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20video/subcategory/Adaptador%20USB-C%20a%20HDMI'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Bateria%20Portátil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Batería%20externa,%20inalámbrica%20y%20magnética%20con%20soporte'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20navegación/subcategory/Soporte%20de%20carga%20para%20teléfono%20móvil%20+%20Navegación%20para%20automóvil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20para%20apple%20watch%20y%20iPhone/subcategory/Bateria%20portátil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20Audio%20y%20Video/subcategory/Cable%20HD-HDMI'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20+%20Estuche%20de%20seguridad'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Banda%20de%20mano%20protectora%20para%20iPhone'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20para%20iPhone'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Audífonos%20para%20niños'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carro/subcategory/Soporte%20de%20carro%20para%20teléfono%20móvil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20imagen/subcategory/Adaptador%20Mini%20Displayport%20a%20VGA'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20imagen/subcategory/Adaptador%20usb-c%20a%20Vga'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20reloj/subcategory/Protector%20de%20pantalla%20para%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Grabación%20y%20soporte%20de%20teléfono/subcategory/Soporte%20magnético%20girable%20para%20grabación'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Cable%20de%20audio%20con%20conector%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Distribuidor%20de%20audio'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20USB-C'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Llavero%20con%20puerto%20lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20Lightning%20a%20USB-C'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20Lightning')
        ]);

        const products = [
          ...airpods.data,
          ...cases.data,
          ...chargers.data,
          ...cables.data
        ];
        setAccessories(products);

        // Fetch images for each accessory
        await Promise.all(products.map(async (product) => {
          const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
          if (imageResponse.data && imageResponse.data.length > 0) {
            const base64Images = imageResponse.data
              .map(image => image?.data ? `data:image/jpeg;base64,${image.data}` : null)
              .filter(Boolean);
            setAccessoryImages(prevState => ({ ...prevState, [product.id]: base64Images }));
          }
        }));
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };

    fetchAccessories();
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
        height: '350px',
        margin: '0 auto', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          height: '180px',
          padding: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div style={{
            border: '1px solid #f0f0f0',
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
                maxHeight: '130px',
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
            <p className="card-text mb-2" style={{ fontSize: '0.8rem', color: '#666' }}>
              {product.subcategory}
            </p>
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

  return (
    <section className="mb-5">
      <h2 className="text-center mb-4">Accesorios Apple</h2>
      <Swiper {...swiperParams}>
        {accessories.map((product) => (
          <SwiperSlide key={product.id}>
            {renderProductCard(product, accessoryImages)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AccessoriesSection;