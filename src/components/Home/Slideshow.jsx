import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import iphone15_1 from '../../img/publicidad1.png';
import iphone15_2 from '../../img/iphone15.png';
import iphone15_3 from '../../img/iphone15_2.png';
import iphone15_4 from '../../img/tiendamac.png';
import iphone15_5 from '../../img/iphone15_3.png';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = [
        iphone15_1,
        iphone15_2,
        iphone15_3,
        iphone15_4,
        iphone15_5
      ];
      setImages(loadedImages);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDoubleClick = () => {
    navigate('/iphone15pro');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    arrows: false,
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid #000", // Borde negro
            borderRadius: "50%",
            backgroundColor: i === currentSlide ? "#000" : "transparent", // Fondo negro para el círculo activo
            display: "inline-block",
            margin: "0 6px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      );
    },
  };

  return (
    <div className="slideshowContainer">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide" onDoubleClick={handleDoubleClick}>
            <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .slideshowContainer {
          position: relative;
        }

        :global(.slick-dots) {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          display: flex !important;
          justify-content: center;
          width: auto;
        }

        :global(.slick-dots li) {
          margin: 0 4px;
        }

        :global(.slick-dots li button:before) {
          content: '';
        }

        :global(.slick-dots li.slick-active div) {
          transform: scale(1.2);
        }

        :global(.slick-dots li div) {
          transition: background-color 0.3s, transform 0.3s;
        }

        .slide {
          transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
        }

        .slide:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Slideshow;
