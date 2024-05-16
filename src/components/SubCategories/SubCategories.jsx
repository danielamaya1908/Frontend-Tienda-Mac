import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Subcategories = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        editingSubcategoryId: null,
        name: '',
        description: '',
        categoryId: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:3005/getAllSubcategories');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
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

        fetchSubcategories();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = formData.editingSubcategoryId ? 'put' : 'post';
        const url = formData.editingSubcategoryId ? `http://localhost:3005/updateSubcategories/${formData.editingSubcategoryId}` : 'http://localhost:3005/createSubcategories';

        try {
            const response = await axios[method](url, formData);
            if (method === 'post') {
                setSubcategories([...subcategories, {...response.data, Category: categories.find(c => c.id === formData.categoryId)}]);
            } else {
                setSubcategories(subcategories.map(sub => sub.id === formData.editingSubcategoryId ? {...sub, ...response.data} : sub));
            }
            setShowForm(false);
            setFormData({
                editingSubcategoryId: null,
                name: '',
                description: '',
                categoryId: ''
            });
        } catch (error) {
            console.error('Failed to submit subcategory:', error);
        }
    };

    const handleEdit = (subcategory) => {
        setFormData({
            editingSubcategoryId: subcategory.id,
            name: subcategory.name,
            description: subcategory.description,
            categoryId: subcategory.categoryId
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3005/deleteSubcategories/${id}`);
            setSubcategories(subcategories.filter(sub => sub.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
            <MenuDashboard /> 
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary mt-3" onClick={() => setShowForm(!showForm)}>
                                    {showForm ? 'Cerrar Formulario' : 'Agregar Subcategoría'}
                                </button>
                                {showForm && (
                                    <div className="card mt-3">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Nombre:</label>
                                                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="categoryId" className="form-label">Categoría:</label>
                                                    <select id="categoryId" name="categoryId" className="form-control" value={formData.categoryId} onChange={handleChange} required>
                                                        <option value="">Seleccione una categoría</option>
                                                        {categories.map((category) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button type="submit" className="btn btn-primary">{formData.editingSubcategoryId ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}</button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <div className="table-responsive mt-3">
                                    <table className="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Categoría</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subcategories.map((sub) => (
                                                <tr key={sub.id}>
                                                    <td>{sub.name}</td>
                                                    <td>{sub.Category ? sub.Category.name : 'Sin categoría'}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(sub.id)}>Eliminar</button>
                                                        <button className="btn btn-primary mx-2" onClick={() => handleEdit(sub)}>Editar</button>
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

export default Subcategories;
