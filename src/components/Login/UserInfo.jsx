import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserInfo.css';

const UserInfo = ({ user, onLogout, onClose }) => {
  const userInfoRef = useRef(null);

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

  return (
    <div className="user-info-overlay">
      <div className="user-info-container" ref={userInfoRef}>
        <h2>Perfil de Usuario</h2>
        <div className="user-details">
          <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserInfo;