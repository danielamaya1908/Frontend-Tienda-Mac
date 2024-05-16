import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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

    useEffect(() => {
        const fetchCapacities = async () => {
            try {
                const response = await axios.get('http://localhost:3005/getAllCapacities');
                setCapacities(response.data);
            } catch (error) {
                console.error('Error fetching capacities:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3005/getAllCategories');
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
                await axios.put(`http://localhost:3005/updateCapacities/${formData.editingCapacityId}`, formData);
                setCapacities(capacities.map(cap => (cap.id === formData.editingCapacityId ? formData : cap)));
                alert('Capacidad actualizada con éxito');
            } else {
                const response = await axios.post('http://localhost:3005/createCapacities', formData);
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
            await axios.delete(`http://localhost:3005/deleteCapacities/${id}`);
            setCapacities(capacities.filter(cap => cap.id !== id));
            alert('Capacidad eliminada con éxito');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                <MenuDashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                                        {showForm ? 'Cerrar Formulario' : 'Agregar Capacidad'}
                                    </button>
                                    {showForm && (
                                        <div className="card mt-3">
                                            <div className="card-body">
                                                <h2>{formData.editingCapacityId ? 'Editar Capacidad' : 'Agregar Capacidad'}</h2>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">Nombre:</label>
                                                        <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="categoryId" className="form-label">Categoría:</label>
                                                        <select id="categoryId" name="categoryId" className="form-control" value={formData.categoryId} onChange={handleChange} required>
                                                            <option value="">Selecciona una categoría</option>
                                                            {categories.map(category => (
                                                                <option key={category.id} value={category.id}>{category.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">{formData.editingCapacityId ? 'Actualizar Capacidad' : 'Agregar Capacidad'}</button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                    <div className="table-responsive mt-3">
                                        <table className="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Categoría ID</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {capacities.map(capacity => (
                                                    <tr key={capacity.id}>
                                                        <td>{capacity.name}</td>
                                                        <td>{capacity.categoryId}</td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => handleDelete(capacity.id)}>Eliminar</button>
                                                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(capacity)}>Editar</button>
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
        </div>
    );
};

export default Capacity;
