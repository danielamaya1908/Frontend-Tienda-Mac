import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slidesShow1 from "./img/iPhone.webp"; // Primera imagen
import slidesShow2 from "./img/Producto_VIP_3.webp"; // Segunda imagen
import slidesShow3 from "./img/Producto_VIP_2.webp"; // Tercera imagen
import slidesShow4 from "./img/Sonido.webp"; // Cuarta imagen
import slidesShow5 from "./img/Accesorios.webp"; // Quinta imagen
import slidesShow6 from "./img//Servicio_Tecnico.webp"; // Sexta imagen
import slidesShow7 from "./img/Delivery.webp"; // Séptima imagen
import slidesShow8 from "./img/SLIDESHOW_USADO.webp"; // Octava imagen
import slidesShow9 from "./img/Eventos.webp"; // Octava imagen

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Mantiene el índice del slide actual
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = [
        slidesShow1,
        slidesShow2,
        slidesShow3,
        slidesShow4,
        slidesShow5,
        slidesShow6,
        slidesShow7,
        slidesShow8, // Agregada la octava imagen
        slidesShow9,
      ];
      setImages(loadedImages);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Redirigir a diferentes rutas según el clic en el iPhone
  const handleClick = (event, index) => {
    const { clientX } = event; // Posición X del clic
    const slideElement = event.currentTarget;
    const { left, width } = slideElement.getBoundingClientRect(); // Obtener posición y dimensiones del slide

    const clickPosition = clientX - left; // Posición del clic relativa al slide
    const middle = width / 2; // Dividir el slide en dos mitades

    if (index === 0) {
      // Solo para la imagen del iPhone
      if (clickPosition < middle) {
        navigate("/iphone16pro"); // Clic en la parte izquierda
      } else {
        navigate("/iphone16"); // Clic en la parte derecha
      }
    } else {
      // Lógica existente para otras imágenes
      switch (index) {
        case 1:
          navigate("/AppleWatchAll"); // Segunda imagen redirige a Apple Watch
          break;
        case 2:
          navigate("/airpods"); // Tercera imagen redirige a Airpods
          break;
        case 3:
          navigate("/sonidoAll"); // Cuarta imagen redirige a categoría de sonido
          break;
        case 4:
          navigate("/AccesoriosAll"); // Quinta imagen redirige a Accesorios
          break;
        case 5:
          window.open(
            "https://api.whatsapp.com/send?phone=573173026445&text=Hola,%20quisiera%20obtener%20información%20sobre%20el%20servicio%20de%20soporte%20técnico.%20Tengo%20un%20equipo%20que%20necesita%20revisión%20y%20me%20gustaría%20conocer%20los%20detalles%20del%20proceso,%20costos,%20y%20tiempos%20de%20reparación.%20Agradezco%20su%20respuesta.",
            "_blank"
          );
          break;
        case 6:
          navigate("/delivery"); // Séptima imagen redirige a servicio de delivery
          break;
        case 7:
          navigate("/rutaParaNuevaImagen"); // Agregar redirección para la octava imagen
          break;
        default:
          navigate("/"); // Si no coincide, redirige a la página principal
          break;
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    beforeChange: (current, next) => setCurrentSlide(next), // Actualiza el índice del slide actual
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
          <div
            key={index}
            className="slide"
            onClick={(event) => handleClick(event, index)}
          >
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
          content: "";
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
