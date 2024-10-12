import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faShoppingCart, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = ({ user, onLogout, onClose }) => {
  const userInfoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="user-info-overlay">
      <div className="user-info-container" ref={userInfoRef}>
        <h2>Perfil de Usuario</h2>
        <div className="user-details">
          <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="user-actions">
          <button onClick={() => handleNavigate('/UserPurchases')} className="user-action-button">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" /> Mis Compras
          </button>
          <button onClick={() => handleNavigate('/detalles-cuenta')} className="user-action-button">
            <FontAwesomeIcon icon={faUserCog} className="icon" /> Detalles de la Cuenta
          </button>
        </div>
        <button onClick={onLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserInfo;