
import React, { useState, useEffect, useRef } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import logo from '../../img/Logo 2.1.png';
import LoginUser from '../Login/LoginUser';
import UserInfo from '../Login/UserInfo';
import Search from './Search'; // Cambia la ruta según tu estructura de carpetas


const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const searchInputRef = useRef(null);

  const [showLoginUser, setShowLoginUser] = useState(false);
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
  const [isAtTop, setIsAtTop] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

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
    if (user) {
      setShowUserInfo(!showUserInfo);
    } else {
      setShowLoginForm(!showLoginForm);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSupportClick = () => {
    navigate('/soporte-tecnico-client');
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSearch(false);
      setShowLoginForm(false);
      setShowUserInfo(false);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleDropdownMouseEnter = (dropdownName) => {
    if (!showMobileMenu) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!showMobileMenu) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdownName) => {
    if (showMobileMenu) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowUserInfo(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <BootstrapNavbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        className={`navbar-custom ${isAtTop ? 'navbar-at-top' : 'navbar-scrolled'}`}
      >
        <Container fluid className="container-fluid-custom navbar-container-fluid">
          <BootstrapNavbar.Brand href="/">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
              onClick={() => window.location.href = '/'}
            />
          </BootstrapNavbar.Brand>
          <div className="d-flex order-lg-2">
            <div className="d-flex align-items-center me-2">
              <FontAwesomeIcon
                icon={faShoppingBag}
                onClick={handleCartClick}
                style={{ cursor: 'pointer', color: 'black' }}
              />
            </div>
            <div className="d-flex align-items-center me-2" style={{ position: 'relative' }}>
              <FontAwesomeIcon
                icon={faUser}
                onClick={handleUserClick}
                style={{ cursor: 'pointer', color: 'black' }}
              />
              {showLoginForm && <LoginUser onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />}
              {showUserInfo && user && (
                <UserInfo
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setShowUserInfo(false)}
                  className="user-info-container"
                />
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <span className="nav-link d-flex align-items-center me-2" style={{ color: 'black' }} onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              {showSearch && (
                <div ref={searchInputRef} className="search-container">
                  <Search onClose={() => setShowSearch(false)} />
                </div>
              )}
            </div>
          </div>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleMobileMenu} />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav" className={showMobileMenu ? 'show' : ''}>
            <Nav className="mr-auto ">
              <Nav.Link>Descubre lo nuevo</Nav.Link>
              <NavDropdown
                title="Mac"
                id="mac-dropdown"
                className="no-caret"
                show={activeDropdown === 'mac'}
                onClick={() => toggleDropdown('mac')}
                onMouseEnter={() => handleDropdownMouseEnter('mac')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="macAll">Macs</NavDropdown.Item>
                <NavDropdown.Item href="macbookAir">MacBook Air</NavDropdown.Item>
                <NavDropdown.Item href="macbookPro">MacBook Pro</NavDropdown.Item>
                <NavDropdown.Item href="imac">iMac</NavDropdown.Item>
                <NavDropdown.Item href="macMini">Mac Mini</NavDropdown.Item>
                <NavDropdown.Item href="macStudio">Mac Studio</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaMac">Accesorios para Mac</NavDropdown.Item>
                <NavDropdown.Item href="MacUsed">Mac Usadas</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="iPads"
                id="ipads-dropdown"
                className="no-caret"
                show={activeDropdown === 'ipads'}
                onClick={() => toggleDropdown('ipads')}
                onMouseEnter={() => handleDropdownMouseEnter('ipads')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="ipadAll">iPads</NavDropdown.Item>
                <NavDropdown.Item href="ipadPro">iPad Pro</NavDropdown.Item>
                <NavDropdown.Item href="ipadAir">iPad Air</NavDropdown.Item>
                <NavDropdown.Item href="ipad">iPad</NavDropdown.Item>
                <NavDropdown.Item href="ipadMini">iPad Mini</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPad">Accesorios para iPad</NavDropdown.Item>
                <NavDropdown.Item href="ipadUsed">iPad Usados</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="iPhones"
                id="iphones-dropdown"
                className="no-caret"
                show={activeDropdown === 'iphones'}
                onClick={() => toggleDropdown('iphones')}
                onMouseEnter={() => handleDropdownMouseEnter('iphones')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="iphoneAll">iPhones</NavDropdown.Item>
                <NavDropdown.Item href="iphone16pro">iPhone 16 Pro</NavDropdown.Item>
                <NavDropdown.Item href="iphone16">iPhone 16</NavDropdown.Item>
                <NavDropdown.Item href="iphone15pro">iPhone 15 Pro</NavDropdown.Item>
                <NavDropdown.Item href="iphone15">iPhone 15</NavDropdown.Item>
                <NavDropdown.Item href="iphone14pro">iPhone 14 Pro</NavDropdown.Item>
                <NavDropdown.Item href="iphone14">iPhone 14</NavDropdown.Item>
                <NavDropdown.Item href="iphone13pro">iPhone 13 Pro</NavDropdown.Item>
                <NavDropdown.Item href="iphone13">iPhone 13</NavDropdown.Item>
                <NavDropdown.Item href="iphone12">iPhone 12</NavDropdown.Item>
                <NavDropdown.Item href="iphone11">iPhone 11</NavDropdown.Item>
                <NavDropdown.Item href="iphoneSE">iPhone SE</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPhone">Accesorios para iPhone</NavDropdown.Item>
                <NavDropdown.Item href="iPhoneUsed">iPhone Usados</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Apple Watch"
                id="applewatch-dropdown"
                className="no-caret"
                show={activeDropdown === 'applewatch'}
                onClick={() => toggleDropdown('applewatch')}
                onMouseEnter={() => handleDropdownMouseEnter('applewatch')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="AppleWatchAll">Watchs</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchUltra2">Apple Watch Ultra 2</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchUltra">Apple Watch Ultra</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchSeries9">Apple Watch Series 9</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchSeries8">Apple Watch Series 8</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchSeries7">Apple Watch Series 7</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchSE">Apple Watch SE</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaWatch">Accesorios para Apple Watch</NavDropdown.Item>
                <NavDropdown.Item href="AppleWatchUsed">Apple Watch Usados</NavDropdown.Item>

              </NavDropdown>
              <NavDropdown
                title="AirPods"
                id="airpods-dropdown"
                className="no-caret"
                show={activeDropdown === 'airpods'}
                onClick={() => toggleDropdown('airpods')}
                onMouseEnter={() => handleDropdownMouseEnter('airpods')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="airpods">AirPods</NavDropdown.Item>
                <NavDropdown.Item href="airpodspro">AirPods Pro (2ª Gen)</NavDropdown.Item>
                <NavDropdown.Item href="airpods3gen">AirPods (3ª Gen)</NavDropdown.Item>
                <NavDropdown.Item href="airpods2gen">AirPods (2ª Gen)</NavDropdown.Item>
                <NavDropdown.Item href="airpodsmax">AirPods Max</NavDropdown.Item>
                {/* <NavDropdown.Item href="#">Parlantes, Audífonos y más</NavDropdown.Item> */}
                <NavDropdown.Item href="AccesoriosParaAirpods">Accesorios para AirPods</NavDropdown.Item>
                <NavDropdown.Item href="airpodsUsed">AirPods Usados</NavDropdown.Item>

              </NavDropdown>
              <NavDropdown
                title="Apple TV & Hogar"
                id="appletv-dropdown"
                className="no-caret"
                show={activeDropdown === 'appletv'}
                onClick={() => toggleDropdown('appletv')}
                onMouseEnter={() => handleDropdownMouseEnter('appletv')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="AppleTVyHogar">Apple TV & Hogar</NavDropdown.Item>
                <NavDropdown.Item href="AppleTV4k">Apple TV 4K</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaTVyHogar">Accesorios para Apple TV & Hogar</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Sonido"
                id="sonido-dropdown"
                className="no-caret"
                show={activeDropdown === 'sonido'}
                onClick={() => toggleDropdown('sonido')}
                onMouseEnter={() => handleDropdownMouseEnter('sonido')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="SonidoAll">Todo de Sonido</NavDropdown.Item>
                <NavDropdown.Item href="Jbl">JBL</NavDropdown.Item>
                <NavDropdown.Item href="Bose">BOSE</NavDropdown.Item>
                <NavDropdown.Item href="Harman">HARMAN</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Accesorios"
                id="accesorios-dropdown"
                className="no-caret"
                show={activeDropdown === 'accesorios'}
                onClick={() => toggleDropdown('accesorios')}
                onMouseEnter={() => handleDropdownMouseEnter('accesorios')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="AccesoriosAll">Todos los Accesorios</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaMac">Accesorios para Mac</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPad">Accesorios para iPad</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaiPhone">Accesorios para iPhone</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaWatch">Accesorios para Watch</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaAirpods">Accesorios para AirPods</NavDropdown.Item>
                <NavDropdown.Item href="AccesoriosParaTVyHogar">Accesorios para TV & Hogar</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Ofertas"
                id="ofertas-dropdown"
                className="no-caret"
                show={activeDropdown === 'ofertas'}
                onClick={() => toggleDropdown('ofertas')}
                onMouseEnter={() => handleDropdownMouseEnter('ofertas')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="#">Ofertas Especiales</NavDropdown.Item>
                <NavDropdown.Item href="#">Ofertas del Mes</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Crédito"
                id="credito-dropdown"
                className="no-caret"
                show={activeDropdown === 'credito'}
                onClick={() => toggleDropdown('credito')}
                onMouseEnter={() => handleDropdownMouseEnter('credito')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item href="#">Sistecredito</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Contáctanos"
                id="contactanos-dropdown"
                className="no-caret"
                show={activeDropdown === 'contactanos'}
                onClick={() => toggleDropdown('contactanos')}
                onMouseEnter={() => handleDropdownMouseEnter('contactanos')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown.Item
                  href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20Me%20interesa%20comprar%201%20Parlante%20Aura%20studio%203%20(15W%20RMS-%20100W%20RMS,%20Negro).%20%C2%BFPodr%C3%ADas%20darme%20informaci%C3%B3n%20adicional%3F%20Gracias!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whatsapp
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tiendapc.com.co&su=Consulta%20de%20producto&body=%C2%A1Hola%20Tienda%20Mac!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20:"
                >
                  Correo electrónico
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#" onClick={handleSupportClick}>Soporte</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;