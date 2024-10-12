import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faEnvelope, faPhone, faIdCard, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DetallesCuenta.css';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const DetallesCuenta = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    documentNumber: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No se encontró el token en localStorage.');

        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/auth/me', {
          headers: { 'x-auth-token': token },
        });

        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => setEditing(true);

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('https://backend-tienda-mac-production.up.railway.app/auth/me', formData, {
        headers: { 'x-auth-token': token },
      });

      setUser(response.data.user);
      setEditing(false);
    } catch (err) {
      setError('Error al actualizar la información del usuario');
    }
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p className="no-user">No se encontró información del usuario.</p>;

  return (
    <>
      <Navbar />
      <div className="detalles-cuenta-container">
        <h1 className="main-title" style={{ color: "black" }}>
          <FontAwesomeIcon icon={faUserCog} /> Detalles de la Cuenta
        </h1>
        <div className="user-info-card">
          {editing ? (
            <div className="detalles-form">
              <div className="form-group">
                <label htmlFor="firstName">Nombre:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellido:</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentNumber">Número de Documento:</label>
                <input
                  id="documentNumber"
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="Número de Documento"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Teléfono:</label>
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección:</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ciudad:</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ciudad"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">País:</label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="País"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Código Postal:</label>
                <input
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Código Postal"
                />
              </div>
              <div className="button-group">
                <button onClick={handleSaveClick} className="btn save">Guardar</button>
                <button onClick={() => setEditing(false)} className="btn cancel">Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="detalles">
              <p className="info-item"><FontAwesomeIcon icon={faUserCog} /> <strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
              <p className="info-item"><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.email}</p>
              <p className="info-item"><FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong> {user.phoneNumber}</p>
              <p className="info-item"><FontAwesomeIcon icon={faIdCard} /> <strong>Número de Documento:</strong> {user.documentNumber}</p>
              <p className="info-item"><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Dirección:</strong> {user.address}, {user.city}, {user.country}, {user.zipCode}</p>
              <button onClick={handleEditClick} className="btn edit">Editar</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetallesCuenta;