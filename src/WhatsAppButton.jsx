// WhatsAppButton.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Importa el icono de WhatsApp desde react-icons

const WhatsAppButton = () => {
    const handleClick = () => {
        // Enlace de WhatsApp para la empresa
        const whatsappLink = "https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20Me%20interesa%20comprar%201%20Parlante%20Aura%20studio%203%20(15W%20RMS-%20100W%20RMS,%20Negro).%20%C2%BFPodr%C3%ADas%20darme%20informaci%C3%B3n%20adicional%3F%20Gracias!";
        window.open(whatsappLink, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '20px',   // Ajusta la distancia desde el fondo
                right: '20px',    // Ajusta la distancia desde la derecha
                zIndex: '1000',
                backgroundColor: '#25D366', // Color de fondo de WhatsApp
                color: 'white',   // Color del texto
                border: 'none',
                borderRadius: '50%',
                width: '60px',    // Ancho del botón
                height: '60px',   // Altura del botón
                fontSize: '24px', // Tamaño del texto
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <FaWhatsapp size={30} /> {/* Icono de WhatsApp con tamaño ajustado */}
        </button>
    );
};

export default WhatsAppButton;
