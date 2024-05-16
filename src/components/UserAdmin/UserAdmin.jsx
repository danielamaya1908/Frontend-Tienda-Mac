import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingBasket, faTicketAlt, faTrademark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from 'react-bootstrap';
import * as yup from 'yup';
import MenuDashboard from '../MenuDashboard/MenuDashboard'; // Importa el componente MenuDashboard

const UserAdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    email: '',
    password: '',
    role: '',
  });
  const [formError, setFormError] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email es requerido'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra, un número y un carácter especial').required('Contraseña es requerida'),
    role: yup.string().required('Rol es requerido'),
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3005/getAllUserAdmins');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios administradores:', error);
      }
    };
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setIsUpdateMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      if (isUpdateMode) {
        await axios.put(`http://localhost:3005/updateUserAdmin/${formData.id}`, formData);
        setUsers(users.map(user => (user.id === formData.id ? formData : user)));
        alert('Usuario actualizado con éxito');
        setFormData({
          id: null,
          email: '',
          password: '',
          role: '',
        });
        setIsUpdateMode(false);
        setShowForm(false);
      } else {
        const response = await axios.post('http://localhost:3005/userAdmin', formData);
        setUsers([...users, response.data]);
        setFormData({
          email: '',
          password: '',
          role: '',
        });
        alert('Usuario creado con éxito');
        setShowForm(false);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = error.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});
        setFormError(errors);
      } else {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/deleteUserAdmin/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard /> {/* Agrega el componente MenuDashboard */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setShowForm(!showForm)}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {showForm ? 'Cerrar Formulario' : 'Agregar Usuario'}
                </button>
                {showForm && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h2>{isUpdateMode ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                      <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={formData.id || ''} />
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email:</label>
                          <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                          {formError.email && <div className="text-danger">{formError.email}</div>}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password:</label>
                          <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                          {formError.password && <div className="text-danger">{formError.password}</div>}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="role" className="form-label">Role:</label>
                          <input type="text" id="role" name="role" className="form-control" value={formData.role} onChange={handleChange} required />
                          {formError.role && <div className="text-danger">{formError.role}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">{isUpdateMode ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
                      </form>
                    </div>
                  </div>
                )}
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(user)}>Editar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAdminManagement;
