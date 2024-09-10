import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SoporteTecnico.css';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const SoporteTecnico = () => {
  const navigate = useNavigate();
  const [ordenesServicio, setOrdenesServicio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos los Estados');

  useEffect(() => {
    const fetchOrdenesServicio = async () => {
      try {
        const response = await axios.get('http://localhost:3005/soporte-Tecnico');
        setOrdenesServicio(response.data);
      } catch (error) {
        console.error('Error al obtener órdenes de servicio:', error);
      }
    };

    fetchOrdenesServicio();
  }, []);

  const filteredOrdenes = ordenesServicio.filter(orden => {
    const matchesSearch = orden.id.toString().includes(searchTerm) ||
                          (orden.User && (orden.User.firstName + ' ' + orden.User.lastName).toLowerCase().includes(searchTerm.toLowerCase())) ||
                          orden.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          orden.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          orden.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos los Estados' || orden.estado.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleAgregarEquipo = () => {
    navigate('/FormEquipo');
  };

  const handleVerDetalles = (id) => {
    navigate(`/soporteTecnico/${id}`);
  };

  const handleEstadoChange = async (id, newEstado) => {
    try {
      let data = { estado: newEstado };

      const response = await axios.put(`http://localhost:3005/soporte-tecnico/${id}/estado`, data);

      setOrdenesServicio(ordenesServicio.map(orden => 
        orden.id === id ? { ...orden, estado: newEstado, fechaSalida: response.data.fechaSalida } : orden
      ));
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'Ingreso':
        return 'El próximo estado será Diagnosticando. Puede demorar de 1 a 3 días para cambiar a ese estado.';
      case 'Diagnosticando':
        return 'El próximo estado será Pendiente. Puede demorar de 1 a 3 días hábiles para su revisión y cambiar de estado.';
      case 'Pendiente':
        return 'Esperando confirmación del cliente.';
      case 'en-reparacion':
        return 'El equipo está siendo reparado.';
      case 'Entregado':
        return 'Puede pasar a recoger en tienda.';
      default:
        return '';
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="soporte-tecnico">
            <h1>Orden de Servicio</h1>
            <div className="controls">
              <input
                type="text"
                placeholder="Buscar orden por #soporte, marca, modelo o serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Todos los Estados">Todos los Estados</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Diagnosticando">Diagnosticando</option>
                <option value="en-reparacion">En Reparación</option>
                <option value="Entregado">Entregado</option>
              </select>
              <button onClick={handleAgregarEquipo} className="btn-agregar">Agregar Nuevo Equipo</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#Orden de Servicio</th>
                  <th>Estado</th>
                  <th>Nombre del Cliente</th>
                  <th># Identificación del Cliente</th>
                  <th>Nombre de Equipo</th>
                  <th>Marca del Equipo</th>
                  <th>Serial del Equipo</th>
                  <th>Fecha de Ingreso</th>
                  <th>Fecha de Salida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdenes.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>
                      <div className="estado-container">
                        <select
                          value={orden.estado}
                          onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
                          className={`estado ${orden.estado.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <option value="Ingreso">Ingreso</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Diagnosticando">Diagnosticando</option>
                          <option value="en-reparacion">En Reparación</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                        <p className="status-description">{getStatusDescription(orden.estado)}</p>
                      </div>
                    </td>
                    <td>
                      {orden.User ? `${orden.User.firstName} ${orden.User.lastName}` : 'Información no disponible'}
                    </td>
                    <td>{orden.userId}</td>
                    <td>{orden.modelo}</td>
                    <td>{orden.marca || 'Información no disponible'}</td>
                    <td>{orden.serial || 'Información no disponible'}</td>
                    <td>{orden.fechaIngreso ? new Date(orden.fechaIngreso).toLocaleDateString() : '-'}</td>
                    <td>{orden.fechaSalida ? new Date(orden.fechaSalida).toLocaleDateString() : '-'}</td>
                    <td><button onClick={() => handleVerDetalles(orden.id)} className="btn-ver">Ver Detalles</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span className="page-number">1</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SoporteTecnico;
