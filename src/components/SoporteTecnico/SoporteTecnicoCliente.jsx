import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginUser from '../Login/LoginUser';
import Navbar from '../NavBar/NavBar';
import './SoporteTecnicoCliente.css';

const SoporteTecnicoCliente = () => {
  const [soportesTecnicos, setSoportesTecnicos] = useState([]);
  const [filteredSoportes, setFilteredSoportes] = useState([]);
  const [showLoginUser, setShowLoginUser] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState('Todos los Estados');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSoportesTecnicos();
    }
  }, [user]);

  useEffect(() => {
    filterSoportes();
  }, [selectedEstado, searchTerm, soportesTecnicos]);

  const fetchSoportesTecnicos = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginUser(true);
      return;
    }

    try {
      const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/soportetecnicocliente', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSoportesTecnicos(response.data);
      setFilteredSoportes(response.data);
    } catch (error) {
      console.error('Error al obtener soportes técnicos:', error);
      if (error.response && error.response.status === 401) {
        setShowLoginUser(true);
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginUser(false);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLoginUser(false);
    fetchSoportesTecnicos();
  };

  const handleFilterChange = (event) => {
    setSelectedEstado(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterSoportes = () => {
    let filtered = soportesTecnicos;

    if (selectedEstado !== 'Todos los Estados') {
      filtered = filtered.filter(
        soporte => soporte.estado.toLowerCase() === selectedEstado.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        soporte =>
          soporte.id.toString().includes(searchTerm) ||
          soporte.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          soporte.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
          soporte.marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSoportes(filtered);
  };

  const getStatusDescription = (status) => {
    switch (status.toLowerCase()) {
      case 'ingreso':
        return 'El próximo estado será Diagnosticando. Puede demorar de 1 a 3 días para cambiar a ese estado.';
      case 'diagnosticando':
        return 'El próximo estado será Pendiente. Puede demorar de 1 a 3 días hábiles para su revisión y cambiar de estado.';
      case 'pendiente':
        return 'Esperando confirmación del cliente.';
      case 'Reparando':
        return 'El equipo está siendo reparado.';
      case 'Reparado':
        return 'El equipo está listo para ser recogido.';
      case 'entregado':
        return 'Puede pasar a recoger en tienda.';
      default:
        return '';
    }
  };

  if (!user) {
    return (
      <div className="soporte-tecnico">
        <Navbar />
        <div className="login-prompt">
          <h1>Soporte Técnico Cliente</h1>
          <p>Por favor, inicia sesión para ver tus soportes técnicos.</p>
          <button className="btn-login" onClick={() => setShowLoginUser(true)}>Iniciar Sesión</button>
          {showLoginUser && <LoginUser onClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />}
        </div>
      </div>
    );
  }

  return (
    <div className="soporte-tecnico">
      <Navbar />
      <h1>Mis Soportes Técnicos</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Buscar por #soporte, marca, modelo o serial..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleFilterChange} value={selectedEstado}>
          <option value="Todos los Estados">Todos los Estados</option>
          <option value="ingreso">Ingreso</option>
          <option value="pendiente">Pendiente</option>
          <option value="diagnosticando">Diagnosticando</option>
          <option value="Reparando">Reparando</option>
          <option value="Reparado">Reparado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>#Soporte</th>
            <th>Estado</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>Fecha de Ingreso</th>
            <th>Fecha de Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSoportes.map((soporte) => (
            <tr key={soporte.id}>
              <td>{soporte.id}</td>
              <td>
                <div className="estado-container">
                  <span className={`estado ${soporte.estado.toLowerCase().replace(/\s+/g, '-')}`}>{soporte.estado}</span>
                  <div className="estado-descripcion">{getStatusDescription(soporte.estado)}</div>
                </div>
              </td>
              <td>{soporte.marca}</td>
              <td>{soporte.modelo}</td>
              <td>{soporte.serial}</td>
              <td>{new Date(soporte.createdAt).toLocaleDateString()}</td>
              <td>{soporte.fechaSalida ? new Date(soporte.fechaSalida).toLocaleDateString() : 'No disponible'}</td>
              <td>
                <button className="btn-ver" onClick={() => navigate(`/soportetecnicocliente/${soporte.id}`)}>Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span className="page-number">1</span>
      </div>
    </div>
  );
};

export default SoporteTecnicoCliente;