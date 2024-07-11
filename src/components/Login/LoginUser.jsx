import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LoginUser = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    try {
      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/auth/LoginUser', {
        email,
        password
      });

      console.log('Respuesta del servidor:', response);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Inicio de sesión exitoso');
        onLoginSuccess(response.data.user);
        onClose();
        navigate('/home');
      } else {
        console.log('Respuesta sin token:', response.data);
        setError('Respuesta inesperada del servidor. Por favor, intente de nuevo.');
      }
    } catch (error) {
      console.error('Error completo:', error);
      if (error.response) {
        console.error('Datos de la respuesta de error:', error.response.data);
        console.error('Estado de la respuesta de error:', error.response.status);
        setError(`Error del servidor: ${error.response.data.msg || 'Intente de nuevo.'}`);
      } else if (error.request) {
        console.error('Error de solicitud:', error.request);
        setError('No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        console.error('Error:', error.message);
        setError('Error al iniciar sesión. Por favor, intente de nuevo.');
      }
    }
  };

  return (
    <div className="login-user-overlay">
      <div className="unique-login-form" ref={formRef}>
        <button className="unique-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="unique-h2">Iniciar sesión</h2>
        {error && <p className="unique-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="unique-form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
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
          <button type="submit" className="unique-btn-primary">Iniciar sesión</button>
        </form>
        <p className="unique-register-link" onClick={handleRegisterClick}>
          ¿No tienes cuenta? Regístrate aquí.
        </p>
      </div>
    </div>
  );
};

export default LoginUser;