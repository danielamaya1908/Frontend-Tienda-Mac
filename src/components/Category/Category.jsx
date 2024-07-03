import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard'; // Importa el componente MenuDashboard

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    editingCategoryId: null,
    Name: '',
    Description: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3005/getAllCategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.editingCategoryId ? 'put' : 'post';
    const url = formData.editingCategoryId
      ? `http://localhost:3005/updateCategory/${formData.editingCategoryId}`
      : 'http://localhost:3005/createCategory';
    
    try {
      const response = await axios[method](url, {
        name: formData.Name,
        description: formData.Description
      });

      if (formData.editingCategoryId) {
        setCategories(categories.map(cat => (cat.id === formData.editingCategoryId ? response.data : cat)));
        alert('Categoría actualizada con éxito');
      } else {
        setCategories([...categories, response.data]);
        alert('Categoría creada con éxito');
      }

      setFormData({ editingCategoryId: null, Name: '', Description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      alert('Error en el proceso de categoría');
    }
  };

  // Initiate edit
  const handleEdit = (category) => {
    setFormData({
      editingCategoryId: category.id,
      Name: category.name,
      Description: category.description,
    });
    setShowForm(true);
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/deleteCategory/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Categoría eliminada con éxito');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la categoría');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard /> {/* Reemplaza el nav con id sidebar por el componente MenuDashboard */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <button className="btn btn-primary mt-3" onClick={() => setShowForm(!showForm)}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {showForm ? 'Cerrar Formulario' : 'Agregar Categoría'}
                </button>
                {showForm && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h2>{formData.editingCategoryId ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="Name" className="form-label">Nombre:</label>
                          <input type="text" id="Name" name="Name" className="form-control" value={formData.Name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="Description" className="form-label">Descripción:</label>
                          <textarea id="Description" name="Description" className="form-control" value={formData.Description} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">{formData.editingCategoryId ? 'Actualizar Categoría' : 'Agregar Categoría'}</button>
                      </form>
                    </div>
                  </div>
                )}
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td>{category.name}</td>
                          <td>{category.description}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>Eliminar</button>
                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(category)}>Editar</button>
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

export default Categories;
