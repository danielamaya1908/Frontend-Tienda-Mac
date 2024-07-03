import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LoginUser = ({ onClose }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [username, setUsername] = useState('');
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
  
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3005//auth/LoginUser', {
        email: username,
        password
      });
  
      if (response.status === 200) {
        // Manejar el inicio de sesión exitoso, puedes guardar el token en localStorage
        localStorage.setItem('token', response.data.token);
        console.log('Inicio de sesión exitoso');
        onClose();
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error (por ejemplo, 400, 500)
        setError(error.response.data.msg || 'Error al iniciar sesión. Por favor, intente de nuevo.');
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError('No se recibió respuesta del servidor. Por favor, intente de nuevo más tarde.');
      } else {
        // Ocurrió un error al configurar la solicitud
        setError('Error al iniciar sesión. Por favor, intente de nuevo.');
      }
    }
  };
  

  return (
    <div className="login-user-overlay">
      <div className="login-form" ref={formRef}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Iniciar sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su nombre de usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input">
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
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
        <p className="register-link" onClick={handleRegisterClick}>
          ¿No tienes cuenta? Regístrate aquí.
        </p>
      </div>
    </div>
  );
};

export default LoginUser;