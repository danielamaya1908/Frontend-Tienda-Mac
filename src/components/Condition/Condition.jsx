import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Condition = () => {
  const [conditions, setConditions] = useState([]);
  const [formData, setFormData] = useState({
    editingConditionId: null,
    name: '',
  });
  const [showForm, setShowForm] = useState(false);

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
        // Actualizar condición existente
        await axios.put(`https://backend-tienda-mac-production.up.railway.app/condition/${formData.editingConditionId}`, formData);
        const updatedConditions = conditions.map(cond => (cond.id === formData.editingConditionId ? formData : cond));
        setConditions(updatedConditions);
        alert('Condición actualizada con éxito');
      } else {
        // Crear nueva condición
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
      console.error('Error:', error);
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
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/${id}`);
      setConditions(conditions.filter(cond => cond.id !== id));
      alert('Condición eliminada con éxito');
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
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setShowForm(!showForm)}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {showForm ? 'Cerrar Formulario' : 'Agregar Condición'}
                </button>
                {showForm && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h2>{formData.editingConditionId ? 'Editar Condición' : 'Agregar Condición'}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Nombre:</label>
                          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">{formData.editingConditionId ? 'Actualizar Condición' : 'Agregar Condición'}</button>
                      </form>
                    </div>
                  </div>
                )}
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conditions.map(condition => (
                        <tr key={condition.id}>
                          <td>{condition.name}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(condition.id)}>Eliminar</button>
                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(condition)}>Editar</button>
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

export default Condition;