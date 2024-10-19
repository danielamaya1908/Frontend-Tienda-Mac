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
import './MenuDashboard.css';

const MenuDashboard = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
            <div className={`menu-toggle d-lg-none`} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
                <div className="position-sticky">
                    <ul className="nav flex-column">
                        {[
                            { to: '/admin/purchases', icon: faShoppingCart, label: 'Compras' },
                            { to: '/soporte-tecnico', icon: faTools, label: 'Soporte Técnico' },
                            { to: '/useradmin', icon: faUsers, label: 'Administradores', dropdown: true },
                            { to: '/client', icon: faUsers, label: 'Clientes', dropdown: true },
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
                                    <NavLink to={to} className="nav-link">
                                        <FontAwesomeIcon icon={icon} className="me-2" />
                                        {label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {isSidebarActive && <div className="overlay d-lg-none" onClick={toggleSidebar}></div>}

            <style jsx>{`
                .sidebar {
                    min-height: 100vh;
                    background-color: white;
                    color: black;
                    padding: 0;
                    width: 200px;
                }

                .position-sticky {
                    position: sticky;
                    top: 0;
                }

                .nav-link {
                    color: black;
                }

                .nav-link:hover {
                    color: #555;
                }

                @media (max-width: 992px) {
                    .sidebar {
                        position: fixed;
                        left: -200px;
                        transition: left 0.3s ease;
                        width: 200px;
                        z-index: 999;
                    }

                    .sidebar.active {
                        left: 0;
                    }

                    .overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 998;
                    }

                    .menu-toggle {
                        position: fixed;
                        top: 15px;
                        left: 15px;
                        font-size: 24px;
                        cursor: pointer;
                        z-index: 1000;
                        color: #0a0a0a;
                        background-color: transparent;
                        border: none;
                        padding: 5px;
                    }

                    body {
                        padding-left: 60px;
                    }

                    .sidebar .nav {
                        margin-top: 60px;
                    }
                }

                @media (min-width: 993px) {
                    .menu-toggle {
                        display: none;
                    }

                    .sidebar {
                        left: 0;
                        width: 200px;
                        position: relative;
                    }

                    .overlay {
                        display: none;
                    }

                    body {
                        padding-left: 0;
                    }

                    .sidebar .nav {
                        margin-top: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default MenuDashboard;