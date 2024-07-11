import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/Logo-letras-huecas-2-1536x985.png';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showIPhoneMenu, setShowIPhoneMenu] = useState(false);
  const [showIPadMenu, setShowIPadMenu] = useState(false);
  const [showMacMenu, setShowMacMenu] = useState(false);
  const [showAirPodsMenu, setShowAirPodsMenu] = useState(false);
  const [showAppleWatchMenu, setShowAppleWatchMenu] = useState(false);
  const [showAppleTvMenu, setShowAppleTvMenu] = useState(false);
  const [showAccessoriesMenu, setShowAccessoriesMenu] = useState(false);
  const [showCreditMenu, setShowCreditMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [showOferMenu, setShowOferMenu] = useState(false);

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
    navigate('/register');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'rgba(255, 255, 255, 0.8)', position: "sticky", top: "0px", height: "60px", zIndex: 1000 }}>
      <div className="container-fluid" style={{ pointerEvents: 'none' }}>
      <div className="d-flex justify-content-between align-items-center w-100" style={{ pointerEvents: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center me-3">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo"
            style={{ width: '150px', maxHeight: '90px', marginLeft: '20px', marginRight: '-30px', cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-auto">
            <li className="nav-item">
              <Dropdown show={false}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                  Descubre lo Nuevo
                  <style>
                    {`
                      .dropdown-toggle::after {
                        display: none !important;
                      }
                    `}
                  </style>
                </Dropdown.Toggle>
                {/* No se muestra Dropdown.Menu */}
              </Dropdown>
            </li>
              <li className="nav-item">
                <Dropdown show={showMacMenu} onMouseEnter={() => setShowMacMenu(true)} onMouseLeave={() => setShowMacMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Mac
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showMacMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="macAll">Macs</Dropdown.Item>
                    <Dropdown.Item href="macbookAir">MacBook Air</Dropdown.Item>
                    <Dropdown.Item href="macbookPro">MacBook Pro</Dropdown.Item>
                    <Dropdown.Item href="imac">iMac</Dropdown.Item>
                    <Dropdown.Item href="macMini">Mac mini</Dropdown.Item>
                    <Dropdown.Item href="macStudio">Mac Studio</Dropdown.Item>
                    {/* <Dropdown.Item href="studioDisplay">Studio Display</Dropdown.Item> */}
                    <Dropdown.Item href="AccesoriosParaMac">Accesorios para Mac</Dropdown.Item>
                    <Dropdown.Item href="MacUsed">Mac Usadas</Dropdown.Item>
                    {/* <Dropdown.Item href="#">Comparar todas las Mac</Dropdown.Item>
                    <Dropdown.Item href="#">Mac Does That</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showIPadMenu} onMouseEnter={() => setShowIPadMenu(true)} onMouseLeave={() => setShowIPadMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    iPad
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showIPadMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="ipadAll">iPads</Dropdown.Item>
                    <Dropdown.Item href="ipadPro">iPad Pro</Dropdown.Item>
                    <Dropdown.Item href="ipadAir">iPad Air</Dropdown.Item>
                    <Dropdown.Item href="ipad">iPad</Dropdown.Item>
                    <Dropdown.Item href="ipadMini">iPad Mini</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaiPad">Accesorios para iPad</Dropdown.Item>
                    <Dropdown.Item href="ipadUsed">iPad Usados</Dropdown.Item>
                    {/* <Dropdown.Item href="#">Comparar todos los iPad</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showIPhoneMenu} onMouseEnter={() => setShowIPhoneMenu(true)} onMouseLeave={() => setShowIPhoneMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                iPhone
                <style>
                  {`
                    .dropdown-toggle::after {
                      display: none !important;
                    }
                  `}
                </style>
              </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showIPhoneMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                  <Dropdown.Item href="iphoneAll">iPhones</Dropdown.Item>
                    <Dropdown.Item href="iphone15pro">iPhone 15 Pro</Dropdown.Item>
                    <Dropdown.Item href="iphone15">iPhone 15</Dropdown.Item>
                    <Dropdown.Item href="iphone14pro">iPhone 14 Pro</Dropdown.Item>
                    <Dropdown.Item href="iphone14">iPhone 14</Dropdown.Item>
                    <Dropdown.Item href="iphone13pro">iPhone 13 Pro</Dropdown.Item>
                    <Dropdown.Item href="iphone13">iPhone 13</Dropdown.Item>
                    <Dropdown.Item href="iphone12">iPhone 12</Dropdown.Item>
                    <Dropdown.Item href="iphone11">iPhone 11</Dropdown.Item>
                    <Dropdown.Item href="iphoneSE">iPhone SE</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaiPhone">Accesorios para iPhone</Dropdown.Item>
                    <Dropdown.Item href="iPhoneUsed">iPhone Usados</Dropdown.Item>
                 {/*    <Dropdown.Item href="#">Comparar todos los iPhone</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showAppleWatchMenu} onMouseEnter={() => setShowAppleWatchMenu(true)} onMouseLeave={() => setShowAppleWatchMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Apple Watch
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showAppleWatchMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="AppleWatchAll">Watchs</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchUltra2">Apple Watch Ultra 2</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchUltra">Apple Watch Ultra</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchSeries9">Apple Watch Series 9</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchSeries8">Apple Watch Series 8</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchSeries7">Apple Watch Series 7</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchSE">Apple Watch SE</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaWatch">Accesorios para Apple Watch</Dropdown.Item>
                    <Dropdown.Item href="AppleWatchUsed">Apple Watch Usados</Dropdown.Item>
                  {/*   <Dropdown.Item href="#">Comparar todos los Apple Watch</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showAirPodsMenu} onMouseEnter={() => setShowAirPodsMenu(true)} onMouseLeave={() => setShowAirPodsMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    AirPods
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showAirPodsMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="airpods">AirPods</Dropdown.Item>
                    <Dropdown.Item href="airpodspro">AirPods Pro (2ª Gen)</Dropdown.Item>
                    <Dropdown.Item href="airpods3gen">AirPods (3ª Gen)</Dropdown.Item>
                    <Dropdown.Item href="airpods2gen">AirPods (2ª Gen)</Dropdown.Item>
                    <Dropdown.Item href="airpodsmax">AirPods Max</Dropdown.Item>
                    {/* <Dropdown.Item href="#">Parlantes, Audífonos y más</Dropdown.Item> */}
                    <Dropdown.Item href="AccesoriosParaAirpods">Accesorios para AirPods</Dropdown.Item>
                    <Dropdown.Item href="airpodsUsed">AirPods Usados</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showAppleTvMenu} onMouseEnter={() => setShowAppleTvMenu(true)} onMouseLeave={() => setShowAppleTvMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Apple TV & Hogar
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showAppleTvMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="AppleTVyHogar">Apple TV & Hogar</Dropdown.Item>
                    <Dropdown.Item href="AppleTV4k">Apple TV 4K</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaTVyHogar">Accesorios para Apple TV & Hogar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showSoundMenu} onMouseEnter={() => setShowSoundMenu(true)} onMouseLeave={() => setShowSoundMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Sonido
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showSoundMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="SonidoAll">Todo de Sonido</Dropdown.Item>
                    <Dropdown.Item href="Jbl">JBL</Dropdown.Item>
                    <Dropdown.Item href="Bose">BOSE</Dropdown.Item>
                    <Dropdown.Item href="Harman">HARMAN</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown show={showAccessoriesMenu} onMouseEnter={() => setShowAccessoriesMenu(true)} onMouseLeave={() => setShowAccessoriesMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Accesorios
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showAccessoriesMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="AccesoriosAll">Todos los Accesorios</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaMac">Accesorios para Mac</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaiPad">Accesorios para iPad</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaiPhone">Accesorios para iPhone</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaWatch">Accesorios para Watch</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaAirpods">Accesorios para AirPods</Dropdown.Item>
                    <Dropdown.Item href="AccesoriosParaTVyHogar">Accesorios para TV & Hogar</Dropdown.Item>
                   {/*  <Dropdown.Item href="#">AirTag y Accesorios</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
                </li>
                <li className="nav-item">
                <Dropdown show={showOferMenu} onMouseEnter={() => setShowOferMenu(true)} onMouseLeave={() => setShowOferMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Ofertas
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showOferMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="#">Ofertas del Mes</Dropdown.Item>
                    <Dropdown.Item href="#">Ofertas Especiales</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
                <li className="nav-item">
                  <Dropdown show={showCreditMenu} onMouseEnter={() => setShowCreditMenu(true)} onMouseLeave={() => setShowCreditMenu(false)}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                      Crédito
                      <style>
                        {`
                          .dropdown-toggle::after {
                            display: none !important;
                          }
                        `}
                      </style>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ display: showCreditMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                      <Dropdown.Item href="#">Sistecredito</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <Dropdown show={false}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                      Soporte
                      <style>
                        {`
                          .dropdown-toggle::after {
                            display: none !important;
                          }
                        `}
                      </style>
                    </Dropdown.Toggle>
                    {/* No se muestra Dropdown.Menu */}
                  </Dropdown>
                </li>
              <li className="nav-item">
                <Dropdown show={showContactMenu} onMouseEnter={() => setShowContactMenu(true)} onMouseLeave={() => setShowContactMenu(false)}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', boxShadow: 'none', paddingRight: '0' }}>
                    Contáctanos
                    <style>
                      {`
                        .dropdown-toggle::after {
                          display: none !important;
                        }
                      `}
                    </style>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ display: showContactMenu ? 'block' : 'none', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <Dropdown.Item href="#">Whatsapp</Dropdown.Item>
                    <Dropdown.Item href="#">Correo electrónico</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
          <div className="d-flex me-3">
            <a href="Cart" className="nav-link me-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingBag} />
            </a>
            <a href="#" className="nav-link me-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onClick={handleUserClick}>
              <FontAwesomeIcon icon={faUser} />
            </a>
            <a href="#" className="nav-link" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />
            </a>
          </div>
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
          <div className="card" style={{ width: '300px', padding: '20px', cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', border: 'none' }} onClick={(e) => setShowLoginForm(false)}>
            <div className="card-body">
              <h5 className="card-title">Iniciar Sesión</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
