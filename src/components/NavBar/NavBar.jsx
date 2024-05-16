import React, { useState, useRef, useEffect } from 'react';
import './NavBar.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // Agregar faSearch para el icono de búsqueda
import logo from '../../img/Logo-letras-huecas-2-1536x985.png'; // Asegúrate de tener la ruta correcta de tu imagen

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleUserClick = () => {
    setShowLoginForm(true);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleOutsideClick = () => {
    setShowLoginForm(false);
    setShowCart(false);
  };

  const handleRegisterClick = () => {
    history.push('/UserForm');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'rgba(255, 255, 255, 0.8)', position:"sticky", top:"0px", height:"90px" }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center me-3">
            <img src={logo} alt="Logo" className="navbar-logo" style={{ width: '150px', maxHeight: '90px', marginLeft: '25px' }} />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-auto">
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Descubre lo Nuevo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Mac</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">iPad</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">iPhone</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Apple Watch</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">AirPods</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Apple Tv & Hogar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Sonido</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Accesorios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Crédito</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-1" href="#">Soporte</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-3" href="#">Contáctanos</a>
              </li>
            </ul>
          </div>
          <div className="d-flex me-3">
            <a href="#" className="nav-link me-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <FontAwesomeIcon icon={faShoppingBag} onClick={handleCartClick} />
            </a>
            <a href="#" className="nav-link me-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onClick={handleUserClick}>
              <FontAwesomeIcon icon={faUser} />
            </a>
            <a href="#" className="nav-link" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />
            </a>
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} onClick={handleOutsideClick}>
          <div className="input-group mt-3" ref={searchInputRef} style={{ width: '80vw', maxWidth: '400px', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '5px' }}>
            <input type="text" className="form-control" placeholder="Buscar en Tienda Mac..." aria-label="Buscar en Tienda Mac" aria-describedby="button-addon2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }} />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
          </div>
        </div>
      )}
      {showLoginForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} onClick={handleOutsideClick}>
          <div className="card" style={{ width: '300px', padding: '20px', cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', border: 'none' }} onClick={(e) => e.stopPropagation()}>
            <h5 className="card-title">Iniciar sesión</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico..." style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ingresa tu contraseña..." style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }} />
              </div>
              <button type="submit" className="btn btn-outline-secondary" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}>
                Ingresar
              </button>
            </form> 
            <p className="mt-3 text-center" style={{ color: 'white' }}>¿No tienes cuenta? <a href="#" style={{ color: 'lightblue', textDecoration: 'underline' }} onClick={handleRegisterClick}>Regístrate</a></p>
          </div>
        </div>
      )}
      {showCart && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} onClick={handleOutsideClick}>
          <div className="card" style={{ width: '300px', padding: '20px', cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', border: 'none' }} onClick={(e) => e.stopPropagation()}>
            {/* Aquí puedes agregar el contenido de tu carrito de compras */}
            <h5 className="card-title">Carrito de Compras</h5>
            <p>Contenido del carrito...</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
