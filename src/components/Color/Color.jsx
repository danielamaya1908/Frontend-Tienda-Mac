import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Color = () => {
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({
    editingColorId: null,
    name: '',
    categoryId: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const colorsPerPage = 10;

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/colors');
        setColors(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
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
      if (formData.editingColorId) {
        const response = await axios.put(`https://backend-tienda-mac-production.up.railway.app/colors/${formData.editingColorId}`, formData);
        setColors(colors.map(color => (color.id === formData.editingColorId ? response.data : color)));
        alert('Color actualizado con éxito');
      } else {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/colors', formData);
        setColors([...colors, response.data]);
        alert('Color creado con éxito');
      }
      setFormData({
        editingColorId: null,
        name: '',
        categoryId: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar el color:', error);
      alert('Ocurrió un error. Verifica los datos.');
    }
  };

  const handleEdit = (color) => {
    setFormData({
      editingColorId: color.id,
      name: color.name,
      categoryId: color.categoryId,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/colors/${id}`);
      setColors(colors.filter(color => color.id !== id));
      alert('Color eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el color:', error);
    }
  };

  const indexOfLastColor = currentPage * colorsPerPage;
  const indexOfFirstColor = indexOfLastColor - colorsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);
  const totalPages = Math.ceil(colors.length / colorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Colores</h1>
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Color'}
            </button>
          </div>
          {showForm && (
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{formData.editingColorId ? 'Editar Color' : 'Agregar Color'}</h5>
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
                      placeholder="Ingresa el nombre del color"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">ID de Categoría:</label>
                    <input
                      type="text"
                      id="categoryId"
                      name="categoryId"
                      className="form-control border-dark"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa el ID de la categoría"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {formData.editingColorId ? 'Actualizar Color' : 'Agregar Color'}
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
                      <th>ID de Categoría</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentColors.map(color => (
                      <tr key={color.id}>
                        <td>{color.name}</td>
                        <td>{color.categoryId}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(color)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(color.id)}>
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
                <nav aria-label="Color pagination">
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

export default Color;
