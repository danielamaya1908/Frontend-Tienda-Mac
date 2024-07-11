import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const RegisterForm = ({ onClose }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLoginClick = () => {
    navigate('/LoginUser');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:3005/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      if (response.data.msg === 'Registro exitoso') {
        console.log('Registro exitoso');
        setSuccessMessage('Te has registrado exitosamente en Tienda Mac');
        
        // Guardar el token y la información del usuario
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirección a home después de 2 segundos
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setError('Error en el registro. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error(error.message);
      setError('Error del servidor. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="register-user-overlay">
      <div className="unique-register-form" ref={formRef}>
        <button className="unique-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="unique-h2">Registro de usuario</h2>
        {error && <p className="unique-error-message">{error}</p>}
        {successMessage && <p className="unique-success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="unique-form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="unique-form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ingrese su apellido"
              required
            />
          </div>
          <div className="unique-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="unique-form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="unique-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                className="unique-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button type="submit" className="unique-btn-primary">Registrarse</button>
        </form>
        <p className="unique-login-link" onClick={handleLoginClick}>
          ¿Ya tienes cuenta? Inicia sesión aquí.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;