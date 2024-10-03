import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    editingCategoryId: null,
    name: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

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
      if (formData.editingCategoryId) {
        const response = await axios.put(`https://backend-tienda-mac-production.up.railway.app/updateCategory/${formData.editingCategoryId}`, formData);
        setCategories(categories.map(cat => (cat.id === formData.editingCategoryId ? response.data : cat)));
        alert('Categoría actualizada con éxito');
      } else {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/createCategory', formData);
        setCategories([...categories, response.data]);
        alert('Categoría creada con éxito');
      }
      setFormData({
        editingCategoryId: null,
        name: '',
        description: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
      alert('Ocurrió un error al procesar la categoría. Verifica los datos ingresados.');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      editingCategoryId: category.id,
      name: category.name,
      description: category.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/deleteCategory/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Categoría eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      alert('No se pudo eliminar la categoría. Inténtalo de nuevo.');
    }
  };

  // Paginación
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Categorías</h1>
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Categoría'}
            </button>
          </div>
          {showForm && (
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{formData.editingCategoryId ? 'Editar Categoría' : 'Agregar Categoría'}</h5>
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
                    <label htmlFor="description" className="form-label">Descripción:</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control border-dark"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa la descripción"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {formData.editingCategoryId ? 'Actualizar Categoría' : 'Agregar Categoría'}
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
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map(category => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(category)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(category.id)}>
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
                <nav aria-label="Category pagination">
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

export default Categories;
