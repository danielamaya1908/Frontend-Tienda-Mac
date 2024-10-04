import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faShoppingBasket,
    faTicketAlt,
    faTrademark,
    faListAlt,
    faPalette,
    faCubes,
    faCheckSquare,
    faShoppingCart,
    faTools,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { NavDropdown } from 'react-bootstrap';
import './MenuDashboard.css'; // Asegúrate de que este archivo CSS esté correctamente referenciado.

const MenuDashboard = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

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
                        {[
                            { to: '/admin/purchases', icon: faShoppingCart, label: 'Compras' },
                            { to: '/soporte-tecnico', icon: faTools, label: 'Soporte Técnico' },
                            {
                                to: '/useradmin',
                                icon: faUsers,
                                label: 'Administradores',
                                dropdown: true,
                            },
                            {
                                to: '/client',
                                icon: faUsers,
                                label: 'Clientes',
                                dropdown: true,
                            },
                            { to: '/product', icon: faShoppingBasket, label: 'Productos' },
                            { to: '/categories', icon: faTicketAlt, label: 'Categorías' },
                            { to: '/subcategories', icon: faListAlt, label: 'Subcategorías' },
                            { to: '/colors', icon: faPalette, label: 'Colores' },
                            { to: '/conditions', icon: faCheckSquare, label: 'Condiciones' },
                            { to: '/capacities', icon: faCubes, label: 'Capacidades' },
                            { to: '/brands', icon: faTrademark, label: 'Marcas' },
                        ].map(({ to, icon, label, dropdown }) => (
                            <li className="nav-item" key={label}>
                                {dropdown ? (
                                    <NavDropdown title={<><FontAwesomeIcon icon={icon} className="me-2" />{label}</>} id={`${label}-nav-dropdown`}>
                                        <NavDropdown.Item as={NavLink} to={to} className="text-dark">
                                            <FontAwesomeIcon icon={icon} className="me-2" />
                                            {label}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavLink to={to} className="nav-link text-white">
                                        <FontAwesomeIcon icon={icon} className="me-2" />
                                        {label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Overlay que aparece en pantallas móviles cuando el menú está abierto */}
            {isSidebarActive && <div className="overlay d-lg-none" onClick={toggleSidebar}></div>}
        </>
    );
};

export default MenuDashboard;
