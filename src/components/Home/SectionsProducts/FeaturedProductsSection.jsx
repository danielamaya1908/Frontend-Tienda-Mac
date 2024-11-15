import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProductImages, setFeaturedProductImages] = useState({});

  const featuredUrls = [
    'https://backend-tienda-mac-production.up.railway.app/products/recent',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Parlantes/subcategory/Parlante%20Portátil',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/MacBook',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/Mac%20studio',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/Mac%20mini',
    'https://backend-tienda-mac-production.up.railway.app/products/category/Computación/subcategory/iMac'
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const responses = await Promise.all(
          featuredUrls.map(url => axios.get(url))
        );

        const allProducts = interleaveProducts(
          responses.map(response => response.data)
        );

        setFeaturedProducts(allProducts);
        fetchImages(allProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const interleaveProducts = (productsArrays) => {
    const maxTotalProducts = 20;
    const maxProductsPerModel = Math.ceil(maxTotalProducts / productsArrays.length);
    const result = [];
    let index = 0;
    
    const limitedArrays = productsArrays.map(array => array.slice(0, maxProductsPerModel));
    
    const maxLength = Math.min(
      Math.max(...limitedArrays.map(arr => arr.length)),
      maxProductsPerModel
    );

    while (result.length < maxTotalProducts && index < maxLength) {
      for (let arrayIndex = 0; arrayIndex < limitedArrays.length; arrayIndex++) {
        if (limitedArrays[arrayIndex][index] && result.length < maxTotalProducts) {
          result.push(limitedArrays[arrayIndex][index]);
        }
      }
      index++;
    }

    return result.slice(0, maxTotalProducts);
  };

  const fetchImages = async (products) => {
    products.forEach(async (product) => {
      try {
        const imageResponse = await axios.get(
          `https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`
        );
        if (imageResponse.data && imageResponse.data.length > 0) {
          const base64Images = imageResponse.data
            .map(image => image?.data ? `data:image/jpeg;base64,${image.data}` : null)
            .filter(Boolean);
          
          if (base64Images.length > 0) {
            setFeaturedProductImages(prevState => ({
              ...prevState,
              [product.id]: base64Images
            }));
          }
        }
      } catch (error) {
        console.error(`Error getting images for product ${product.id}:`, error);
      }
    });
  };

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

  const renderProductCard = (product) => {
    const productImages = featuredProductImages[product.id] || [];
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
      <Swiper {...swiperParams}>
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            {renderProductCard(product)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProductsSection;