import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const UserAdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, email: '', password: '', role: '' });
  const [formError, setFormError] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllUserAdmins');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios administradores:', error);
      }
    };
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setFormData({ id: user.id, email: user.email, password: user.password, role: user.role });
    setIsUpdateMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/deleteUserAdmin/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      await axios.put(`https://backend-tienda-mac-production.up.railway.app/updateUserAdmin/${formData.id}`, formData);
    } else {
      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/userAdmin', formData);
      setUsers([...users, response.data]);
    }
    setShowForm(false);
    setFormData({ id: null, email: '', password: '', role: '' });
  };

  // Lógica de Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Administrar Usuarios</h1>
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cerrar Formulario' : <><FontAwesomeIcon icon={faPlus} /> Agregar Usuario</>}
            </button>
          </div>
          {showForm && (
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{isUpdateMode ? 'Editar Usuario' : 'Agregar Usuario'}</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email del Usuario</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-dark"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa el email del usuario"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control border-dark"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa la contraseña"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rol de Usuario</label>
                    <input
                      type="text"
                      name="role"
                      className="form-control border-dark"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa el rol (e.g., Admin)"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {isUpdateMode ? 'Actualizar' : 'Agregar'}
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(user)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user.id)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-light">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <small className="text-muted mb-2 mb-md-0">Página {currentPage} de {totalPages}</small>
                <nav aria-label="User pagination">
                  <ul className="pagination pagination-sm m-0 justify-content-center">
                    {[...Array(totalPages).keys()].map(page => (
                      <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(page + 1)}>
                          {page + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAdminManagement;
