import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Color = () => {
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({
    editingColorId: null,
    name: '',
    categoryId: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/colors');
        setColors(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
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

    fetchColors();
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
      if (formData.editingColorId) {
        await axios.put(`https://backend-tienda-mac-production.up.railway.app/color/${formData.editingColorId}`, formData);
        setColors(colors.map(col => (col.id === formData.editingColorId ? formData : col)));
        alert('Color actualizado con éxito');
      } else {
        const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/color', formData);
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
      console.error('Error:', error);
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
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/color/${id}`);
      setColors(colors.filter(col => col.id !== id));
      alert('Color eliminado con éxito');
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
                  {showForm ? 'Cerrar Formulario' : 'Agregar Color'}
                </button>
                {showForm && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h2>{formData.editingColorId ? 'Editar Color' : 'Agregar Color'}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Nombre:</label>
                          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="categoryId" className="form-label">Categoría:</label>
                          <select id="categoryId" name="categoryId" className="form-select" value={formData.categoryId} onChange={handleChange} required>
                            <option value="">Seleccionar categoría</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">{formData.editingColorId ? 'Actualizar Color' : 'Agregar Color'}</button>
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
                      {colors.map(color => (
                        <tr key={color.id}>
                          <td>{color.name}</td>
                          <td>{color.Category && color.Category.name}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(color.id)}>Eliminar</button>
                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(color)}>Editar</button>
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

export default Color;
