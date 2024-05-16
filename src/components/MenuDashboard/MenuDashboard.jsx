import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShoppingBasket, faTicketAlt, faTrademark, faListAlt, faPalette, faCubes } from '@fortawesome/free-solid-svg-icons';
import { NavDropdown } from 'react-bootstrap';
import './MenuDashboard.css'; // Asegúrate de que este importe apunta al archivo CSS correcto

const MenuDashboard = () => {
    return (
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
            <div className="position-sticky">
                <ul className="nav flex-column">
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
                        <NavLink to="/capacities" className="nav-link text-white">
                            <FontAwesomeIcon icon={faCubes} className="me-2" />
                            Capacidad
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
                        <NavLink to="/brands" className="nav-link text-white">
                            <FontAwesomeIcon icon={faTrademark} className="me-2" />
                            Marcas
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" className="nav-link text-white">
                            <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
                            Órdenes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/coupons" className="nav-link text-white">
                            <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                            Cupones
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MenuDashboard;
