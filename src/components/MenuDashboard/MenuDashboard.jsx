import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShoppingBasket, faTicketAlt, faTrademark, faListAlt, faPalette, faCubes, faCheckSquare, faShoppingCart, faTools, faBars } from '@fortawesome/free-solid-svg-icons';
import { NavDropdown } from 'react-bootstrap';
import './MenuDashboard.css'; // Asegúrate de que este archivo CSS esté correctamente referenciado.

const MenuDashboard = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    // Función para alternar el menú lateral en pantallas pequeñas
    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
            {/* Botón de menú hamburguesa, visible solo en móviles */}
            <div className={`menu-toggle d-lg-none`} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            {/* Menú lateral */}
            <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
                <div className="position-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to="/admin/purchases" className="nav-link text-white">
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                Compras
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/soporte-tecnico" className="nav-link text-white">
                                <FontAwesomeIcon icon={faTools} className="me-2" />
                                Soporte Técnico
                            </NavLink>
                        </li>
                        <NavDropdown title={<><FontAwesomeIcon icon={faUsers} className="me-2" />Usuarios</>} id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/useradmin" className="text-dark">
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                Administradores
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/client" className="text-dark">
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                Clientes
                            </NavDropdown.Item>
                        </NavDropdown>
                        <li className="nav-item">
                            <NavLink to="/product" className="nav-link text-white">
                                <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
                                Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/categories" className="nav-link text-white">
                                <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                                Categorías
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/subcategories" className="nav-link text-white">
                                <FontAwesomeIcon icon={faListAlt} className="me-2" />
                                Subcategorías
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/colors" className="nav-link text-white">
                                <FontAwesomeIcon icon={faPalette} className="me-2" />
                                Colores
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/conditions" className="nav-link text-white">
                                <FontAwesomeIcon icon={faCheckSquare} className="me-2" />
                                Condiciones
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/capacities" className="nav-link text-white">
                                <FontAwesomeIcon icon={faCubes} className="me-2" />
                                Capacidades
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/brands" className="nav-link text-white">
                                <FontAwesomeIcon icon={faTrademark} className="me-2" />
                                Marcas
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Overlay que aparece en pantallas móviles cuando el menú está abierto */}
            {isSidebarActive && <div className="overlay d-lg-none" onClick={toggleSidebar}></div>}
        </>
    );
};

export default MenuDashboard;
