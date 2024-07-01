import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BuyModal = ({ show, onHide, productName }) => {
  const [addToCartButtonHovered, setAddToCartButtonHovered] = useState(false);
  const [buyButtonHovered, setBuyButtonHovered] = useState(false);

  const handleAddToCart = () => {
    console.log(`Agregando ${productName} al carrito`);
    onHide();
  };



  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="modal-content text-dark p-4 rounded">
          <h5 className="text-center mb-4">¡Hola! Somos Tienda Mac</h5>
          <p className="text-center mb-4">Estás a punto de comprar <span className="fw-bold text-uppercase">{productName}</span>. ¿Qué acción deseas realizar?</p>
          <div className="d-flex justify-content-center">
            {/* Botón Agregar al carrito original, comentado */}
            {/* <Button
              variant="outline-secondary"
              onMouseEnter={() => setAddToCartButtonHovered(true)}
              onMouseLeave={() => setAddToCartButtonHovered(false)}
              onClick={handleAddToCart}
              className="me-2"
              style={{
                backgroundColor: addToCartButtonHovered ? 'rgba(50, 50, 50, 0.9)' : 'rgba(50, 50, 50, 0.7)',
                color: 'white',
                border: 'none',
                transition: 'background-color 0.3s, color 0.3s'
              }}
            >
              Agregar al carrito
            </Button> */}

            {/* Botón Comprar provisional */}
            <button
              className="btn btn-primary"
              onMouseEnter={() => setBuyButtonHovered(true)}
              onMouseLeave={() => setBuyButtonHovered(false)}
              onClick={() => handleBuyButtonClick('15551234567')}
              style={{
                backgroundColor: buyButtonHovered ? '#004080' : '#007bff',
                color: 'white',
                border: 'none',
                transition: 'background-color 0.3s',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer'
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyModal;
