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
  const [documentNumber, setDocumentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
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
      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/auth/register', {
        firstName,
        lastName,
        email,
        password,
        documentNumber,
        phoneNumber,
        address,
        city,
        country,
        zipCode
      });
      if (response.data.msg === 'Registro exitoso') {
        console.log('Registro exitoso');
        setSuccessMessage('Te has registrado exitosamente en Tienda Mac');
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
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
        <h2 className="unique-h2">Registro de Usuario</h2>
        {error && <p className="unique-error-message">{error}</p>}
        {successMessage && <p className="unique-success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 unique-form-group">
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                required
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 unique-form-group">
              <label htmlFor="phoneNumber">Teléfono</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Teléfono"
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="documentNumber">Documento</label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="Documento"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 unique-form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="País"
              />
            </div>
            <div className="col-md-4 unique-form-group">
              <label htmlFor="zipCode">Código Postal</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Código Postal"
              />
            </div>
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
                placeholder="Contraseña"
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
