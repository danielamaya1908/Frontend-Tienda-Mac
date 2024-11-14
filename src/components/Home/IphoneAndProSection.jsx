import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const IphoneAndProSection = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [newProductImages, setNewProductImages] = useState({});

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone/name/iPhone%2013%20Pro');
        setNewProducts(response.data);

        // Fetch images for each product
        await Promise.all(response.data.map(async (product) => {
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

  return (
    <section className="mb-5">
      <h2 className="text-center mb-4">iPhone 16 & iPhone 16 Pro</h2>
      <Swiper {...swiperParams}>
        {newProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} images={newProductImages} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default IphoneAndProSection;