import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const IphoneAndProSection = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [newProductImages, setNewProductImages] = useState({});

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const [
          iphone16Pro,
          iphone16ProMax,
          iphone16,
          iphone16Plus
        ] = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Pro'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Pro%20Max'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2016%20Plus')
        ]);

        const products = [
          ...iphone16Pro.data,
          ...iphone16ProMax.data,
          ...iphone16.data,
          ...iphone16Plus.data
        ];
        setNewProducts(products);

        // Fetch images for each product
        await Promise.all(products.map(async (product) => {
          const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
          if (imageResponse.data && imageResponse.data.length > 0) {
            const base64Images = imageResponse.data
              .map(image => image?.data ? `data:image/jpeg;base64,${image.data}` : null)
              .filter(Boolean);
            setNewProductImages(prevState => ({ ...prevState, [product.id]: base64Images }));
          }
        }));
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    fetchNewProducts();
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

  return (
    <section className="mb-5">
      <h2 className="text-center mb-4">iPhone 16 & iPhone 16 Pro</h2>
      <Swiper {...swiperParams}>
        {newProducts.map((product) => (
          <SwiperSlide key={product.id}>
            {renderProductCard(product, newProductImages)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default IphoneAndProSection;