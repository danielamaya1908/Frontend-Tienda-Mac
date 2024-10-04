import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: null, firstName: '', lastName: '', email: '', rol: '' });
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const usersPerPage = 10;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/users');
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.error('Expected an array but got:', response.data.users);
                    setUsers([]);
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (user) => {
        setFormData({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, rol: user.rol });
        setIsUpdateMode(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backend-tienda-mac-production.up.railway.app/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdateMode) {
                const response = await axios.put(`https://backend-tienda-mac-production.up.railway.app/users/${formData.id}`, formData);
                setUsers(users.map(user => user.id === formData.id ? response.data.user : user));
            } else {
                const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/users', formData);
                setUsers([...users, response.data.user]);
            }
            setShowForm(false);
            setFormData({ id: null, firstName: '', lastName: '', email: '', rol: '' });
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    };

    // Paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error al cargar usuarios: {error.message}</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <MenuDashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Lista de Usuarios</h1>
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
                                        <label htmlFor="firstName" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control border-dark"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ingresa el nombre"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Apellido</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control border-dark"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ingresa el apellido"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control border-dark"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ingresa el email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rol" className="form-label">Rol</label>
                                        <input
                                            type="text"
                                            name="rol"
                                            className="form-control border-dark"
                                            value={formData.rol}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ingresa el rol"
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
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.rol}</td>
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

export default UsersList;