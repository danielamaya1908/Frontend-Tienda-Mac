import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Condition = () => {
  const [conditions, setConditions] = useState([]);
  const [formData, setFormData] = useState({
    editingConditionId: null,
    name: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const conditionsPerPage = 10;

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/condition');
        setConditions(response.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchConditions();
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
      if (formData.editingConditionId) {
        const response = await axios.put(`https://backend-tienda-mac-production.up.railway.app/condition/${formData.editingConditionId}`, formData);
        setConditions(conditions.map(cond => (cond.id === formData.editingConditionId ? response.data : cond)));
        alert('Condición actualizada con éxito');
      } else {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/condition', formData);
        setConditions([...conditions, response.data]);
        alert('Condición creada con éxito');
      }
      setFormData({
        editingConditionId: null,
        name: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la condición:', error);
      alert('Ocurrió un error. Verifica los datos.');
    }
  };

  const handleEdit = (condition) => {
    setFormData({
      editingConditionId: condition.id,
      name: condition.name,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/condition/${id}`);
      setConditions(conditions.filter(cond => cond.id !== id));
      alert('Condición eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la condición:', error);
    }
  };

  const indexOfLastCondition = currentPage * conditionsPerPage;
  const indexOfFirstCondition = indexOfLastCondition - conditionsPerPage;
  const currentConditions = conditions.slice(indexOfFirstCondition, indexOfLastCondition);
  const totalPages = Math.ceil(conditions.length / conditionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Condiciones</h1>
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Condición'}
            </button>
          </div>
          {showForm && (
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{formData.editingConditionId ? 'Editar Condición' : 'Agregar Condición'}</h5>
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
                  <button type="submit" className="btn btn-primary">
                    {formData.editingConditionId ? 'Actualizar Condición' : 'Agregar Condición'}
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentConditions.map(condition => (
                      <tr key={condition.id}>
                        <td>{condition.name}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(condition)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(condition.id)}>
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
                <nav aria-label="Condition pagination">
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

export default Condition;
