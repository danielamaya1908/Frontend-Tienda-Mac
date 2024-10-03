import React, { useState, useEffect } from 'react';
import ExcelUpload from './ExcelUpload';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    itemId: '',
    name: '',
    description: '',
    price: '',
    priceUsd: '',
    quantity: '',
    guarantee: '',
    currency: '',
    tax: '',
    barcode: '',
    categoryId: '',
    brandId: '',
    colorId: '',
    capacityId: '',
    subcategoryId: '',
    discount: '',
    conditionId: '',
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchCapacities();
    fetchSubcategories();
    fetchConditions();
    fetchColors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/getAllCategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al cargar las categorías');
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/getAllBrands');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Error al cargar las marcas');
    }
  };

  const fetchCapacities = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/getAllCapacities');
      if (!response.ok) {
        throw new Error('Failed to fetch capacities');
      }
      const data = await response.json();
      setCapacities(data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
      setError('Error al cargar las capacidades');
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/getAllSubcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError('Error al cargar las subcategorías');
    }
  };

  const fetchConditions = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/condition');
      if (!response.ok) {
        throw new Error('Failed to fetch conditions');
      }
      const data = await response.json();
      setConditions(data);
    } catch (error) {
      console.error('Error fetching conditions:', error);
      setError('Error al cargar las condiciones');
    }
  };

  const fetchColors = async () => {
    try {
      const response = await fetch('https://backend-tienda-mac-production.up.railway.app/colors');
      if (!response.ok) {
        throw new Error('Failed to fetch colors');
      }
      const data = await response.json();
      setColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
      setError('Error al cargar los colores');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Filter out empty string values
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );

    try {
      await onSubmit(filteredFormData);
      // Reset form on successful submission
      setFormData({
        itemId: '',
        name: '',
        description: '',
        price: '',
        priceUsd: '',
        quantity: '',
        guarantee: '',
        currency: '',
        tax: '',
        barcode: '',
        categoryId: '',
        brandId: '',
        colorId: '',
        capacityId: '',
        subcategoryId: '',
        discount: '',
        conditionId: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error al enviar el formulario. Por favor, intente de nuevo.');
    }
  };

  const handleShowExcelUpload = () => {
    setShowExcelUpload(true);
  };

  const handleCancelExcelUpload = () => {
    setShowExcelUpload(false);
  };

  const handleUploadExcel = (fileData) => {
    // Logic to process Excel file
    console.log('Excel file data:', fileData);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Agregar Nuevo Producto</h5>
        {!showExcelUpload && (
          <button className="btn btn-light" onClick={handleShowExcelUpload}>
            Agregar Excel
          </button>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {showExcelUpload ? (
          <div>
            <ExcelUpload onUpload={handleUploadExcel} />
            <button className="btn btn-secondary mt-3" onClick={handleCancelExcelUpload}>
              Cancelar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="itemId" className="form-label">Item ID:</label>
                <input type="text" id="itemId" name="itemId" className="form-control" placeholder="Ingrese el ID del artículo" value={formData.itemId} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre:</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Ingrese el nombre del producto" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción:</label>
              <textarea id="description" name="description" className="form-control" placeholder="Describa el producto" value={formData.description} onChange={handleChange} rows="3"></textarea>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="price" className="form-label">Precio:</label>
                <input type="number" id="price" name="price" className="form-control" placeholder="Precio en moneda local" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="priceUsd" className="form-label">Precio en USD:</label>
                <input type="number" id="priceUsd" name="priceUsd" className="form-control" placeholder="Precio en USD" value={formData.priceUsd} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="quantity" className="form-label">Cantidad:</label>
                <input type="number" id="quantity" name="quantity" className="form-control" placeholder="Cantidad disponible" value={formData.quantity} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="categoryId" className="form-label">Categoría:</label>
                <select id="categoryId" name="categoryId" className="form-select" value={formData.categoryId} onChange={handleChange} required>
                  <option value="">Seleccione una categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="brandId" className="form-label">Marca:</label>
                <select id="brandId" name="brandId" className="form-select" value={formData.brandId} onChange={handleChange} required>
                  <option value="">Seleccione una marca</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="conditionId" className="form-label">Condición:</label>
                <select id="conditionId" name="conditionId" className="form-select" value={formData.conditionId} onChange={handleChange} required>
                  <option value="">Seleccione una condición</option>
                  {conditions.map(condition => (
                    <option key={condition.id} value={condition.id}>{condition.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="colorId" className="form-label">Color:</label>
                <select id="colorId" name="colorId" className="form-select" value={formData.colorId} onChange={handleChange}>
                  <option value="">Seleccione un color</option>
                  {colors.map(color => (
                    <option key={color.id} value={color.id}>{color.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="capacityId" className="form-label">Capacidad:</label>
                <select id="capacityId" name="capacityId" className="form-select" value={formData.capacityId} onChange={handleChange}>
                  <option value="">Seleccione una capacidad</option>
                  {capacities.map(capacity => (
                    <option key={capacity.id} value={capacity.id}>{capacity.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="subcategoryId" className="form-label">Subcategoría:</label>
              <select id="subcategoryId" name="subcategoryId" className="form-select" value={formData.subcategoryId} onChange={handleChange}>
                <option value="">Seleccione una subcategoría</option>
                {subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="guarantee" className="form-label">Garantía:</label>
                <input type="text" id="guarantee" name="guarantee" className="form-control" placeholder="Ej: 1 año" value={formData.guarantee} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="currency" className="form-label">Moneda:</label>
                <input type="text" id="currency" name="currency" className="form-control" placeholder="Ej: USD, EUR" value={formData.currency} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="tax" className="form-label">Impuesto (%):</label>
                <input type="number" id="tax" name="tax" className="form-control" placeholder="Ej: 19" value={formData.tax} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="barcode" className="form-label">Código de Barras:</label>
                <input type="text" id="barcode" name="barcode" className="form-control" placeholder="Ingrese el código de barras" value={formData.barcode} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="discount" className="form-label">Descuento (%):</label>
                <input type="number" id="discount" name="discount" className="form-control" placeholder="Ej: 10" value={formData.discount} onChange={handleChange} />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Agregar Producto</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductForm;