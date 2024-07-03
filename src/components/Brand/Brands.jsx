import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrademark } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard'; 

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });
  const [formError, setFormError] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3005/getAllBrands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (brand) => {
    setFormData({
      ...brand,
    });
    setIsUpdateMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdateMode) {
        await axios.put(`http://localhost:3005/updateBrand/${formData.id}`, formData);
        setBrands(brands.map(brand => (brand.id === formData.id ? formData : brand)));
        alert('Marca actualizada con éxito');
      } else {
        const response = await axios.post('http://localhost:3005/createBrand', formData);
        setBrands([...brands, response.data]);
        alert('Marca creada con éxito');
      }
      setFormData({
        name: '',
        image: '',
      });
      setIsUpdateMode(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/deleteBrand/${id}`);
      setBrands(brands.filter(brand => brand.id !== id));
      alert('Marca eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
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
                  {showForm ? 'Cerrar Formulario' : 'Agregar Marca'}
                </button>
                {showForm && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h2>{isUpdateMode ? 'Editar Marca' : 'Agregar Marca'}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Nombre:</label>
                          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">Imagen:</label>
                          <input type="text" id="image" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">{isUpdateMode ? 'Actualizar Marca' : 'Agregar Marca'}</button>
                      </form>
                    </div>
                  </div>
                )}
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map(brand => (
                        <tr key={brand.id}>
                          <td>{brand.name}</td>
                          <td>{brand.image}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(brand.id)}>Eliminar</button>
                            <button className="btn btn-primary mx-2" onClick={() => handleEdit(brand)}>Editar</button>
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

export default Brands;
