import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuDashboard from '../MenuDashboard/MenuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [subcategoriesPerPage] = useState(5);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllSubcategories');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
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
        const url = formData.editingSubcategoryId ? `https://backend-tienda-mac-production.up.railway.app/updateSubcategories/${formData.editingSubcategoryId}` : 'https://backend-tienda-mac-production.up.railway.app/createSubcategories';

        try {
            const response = await axios[method](url, formData);
            if (method === 'post') {
                setSubcategories([...subcategories, { ...response.data, Category: categories.find(c => c.id === formData.categoryId) }]);
            } else {
                setSubcategories(subcategories.map(sub => sub.id === formData.editingSubcategoryId ? { ...sub, ...response.data } : sub));
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
            await axios.delete(`https://backend-tienda-mac-production.up.railway.app/deleteSubcategories/${id}`);
            setSubcategories(subcategories.filter(sub => sub.id !== id));
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    const indexOfLastSubcategory = currentPage * subcategoriesPerPage;
    const indexOfFirstSubcategory = indexOfLastSubcategory - subcategoriesPerPage;
    const currentSubcategories = subcategories.slice(indexOfFirstSubcategory, indexOfLastSubcategory);
    const totalPages = Math.ceil(subcategories.length / subcategoriesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="row">
                <MenuDashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Subcategorías</h1>
                        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                            <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Subcategoría'}
                        </button>
                    </div>
                    {showForm && (
                        <div className="card mb-3 shadow">
                            <div className="card-body">
                                <h5 className="card-title">{formData.editingSubcategoryId ? 'Editar Subcategoría' : 'Agregar Subcategoría'}</h5>
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
                                            placeholder="Ingresa el nombre de la subcategoría"
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
                                            <option value="">Seleccione una categoría</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        {formData.editingSubcategoryId ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}
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
                                        {currentSubcategories.map(sub => (
                                            <tr key={sub.id}>
                                                <td>{sub.name}</td>
                                                <td>{sub.Category ? sub.Category.name : 'Sin categoría'}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(sub)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(sub.id)}>
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
                                <nav aria-label="Subcategories pagination">
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

export default Subcategories;
