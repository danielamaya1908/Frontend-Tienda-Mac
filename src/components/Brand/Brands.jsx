import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    image: '',
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(5);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/getAllBrands');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isUpdateMode ? 'put' : 'post';
    const url = isUpdateMode ? `https://backend-tienda-mac-production.up.railway.app/updateBrand/${formData.id}` : 'https://backend-tienda-mac-production.up.railway.app/createBrand';

    try {
      const response = await axios[method](url, formData);
      if (method === 'post') {
        setBrands([...brands, response.data]);
      } else {
        setBrands(brands.map(brand => (brand.id === formData.id ? response.data : brand)));
      }
      setShowForm(false);
      setFormData({
        id: null,
        name: '',
        image: '',
      });
      setIsUpdateMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (brand) => {
    setFormData({
      id: brand.id,
      name: brand.name,
      image: brand.image,
    });
    setIsUpdateMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-tienda-mac-production.up.railway.app/deleteBrand/${id}`);
      setBrands(brands.filter(brand => brand.id !== id));
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);
  const totalPages = Math.ceil(brands.length / brandsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Marcas</h1>
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
              <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Cerrar Formulario' : 'Agregar Marca'}
            </button>
          </div>
          {showForm && (
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">{isUpdateMode ? 'Editar Marca' : 'Agregar Marca'}</h5>
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
                      placeholder="Ingresa el nombre de la marca"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen:</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      className="form-control border-dark"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      placeholder="Ingresa la URL de la imagen"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {isUpdateMode ? 'Actualizar Marca' : 'Agregar Marca'}
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
                      <th>Imagen</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBrands.map(brand => (
                      <tr key={brand.id}>
                        <td>{brand.name}</td>
                        <td>
                          {/* <img src={brand.image} alt={brand.name} style={{ width: '50px', height: '50px' }} /> */}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(brand)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(brand.id)}>
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
                <nav aria-label="Brands pagination">
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

export default Brands;
