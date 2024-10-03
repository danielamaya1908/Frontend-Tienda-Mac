import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Capacity = () => {
    const [capacities, setCapacities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        editingCapacityId: null,
        name: '',
        categoryId: '',
    });
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const capacitiesPerPage = 10;

    useEffect(() => {
        const fetchCapacities = async () => {
            try {
                const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllCapacities');
                setCapacities(response.data);
            } catch (error) {
                console.error('Error fetching capacities:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllCategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCapacities();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.editingCapacityId) {
                await axios.put(`https://backend-tienda-mac-production.up.railway.app/updateCapacities/${formData.editingCapacityId}`, formData);
                setCapacities(capacities.map(cap => (cap.id === formData.editingCapacityId ? formData : cap)));
                alert('Capacidad actualizada con éxito');
            } else {
                const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/createCapacities', formData);
                setCapacities([...capacities, response.data]);
                alert('Capacidad creada con éxito');
            }
            setFormData({
                editingCapacityId: null,
                name: '',
                categoryId: '',
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (capacity) => {
        setFormData({
            editingCapacityId: capacity.id,
            name: capacity.name,
            categoryId: capacity.categoryId,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backend-tienda-mac-production.up.railway.app/deleteCapacities/${id}`);
            setCapacities(capacities.filter(cap => cap.id !== id));
            alert('Capacidad eliminada con éxito');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Lógica de Paginación
    const indexOfLastCapacity = currentPage * capacitiesPerPage;
    const indexOfFirstCapacity = indexOfLastCapacity - capacitiesPerPage;
    const currentCapacities = capacities.slice(indexOfFirstCapacity, indexOfLastCapacity);
    const totalPages = Math.ceil(capacities.length / capacitiesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="row">
                <MenuDashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Capacidades</h1>
                        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                            <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Capacidad'}
                        </button>
                    </div>
                    {showForm && (
                        <div className="card mb-3 shadow">
                            <div className="card-body">
                                <h5 className="card-title">{formData.editingCapacityId ? 'Editar Capacidad' : 'Agregar Capacidad'}</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre:</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control border-dark"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ingresa el nombre"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="categoryId" className="form-label">Categoría:</label>
                                        <select
                                            id="categoryId"
                                            name="categoryId"
                                            className="form-control border-dark"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        {formData.editingCapacityId ? 'Actualizar Capacidad' : 'Agregar Capacidad'}
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
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCapacities.map(capacity => (
                                            <tr key={capacity.id}>
                                                <td>{capacity.name}</td>
                                                <td>{capacity.Category && capacity.Category.name}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(capacity)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(capacity.id)}>
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
                                <nav aria-label="Capacity pagination">
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

export default Capacity;
