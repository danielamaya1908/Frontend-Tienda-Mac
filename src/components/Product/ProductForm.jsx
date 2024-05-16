
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
    image: '',
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
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [showExcelUpload, setShowExcelUpload] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchCapacities();
    fetchSubcategories();
    fetchColors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3005/getAllCategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3005/getAllBrands');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCapacities = async () => {
    try {
      const response = await fetch('http://localhost:3005/getAllCapacities');
      if (!response.ok) {
        throw new Error('Failed to fetch capacities');
      }
      const data = await response.json();
      setCapacities(data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://localhost:3005/getAllSubcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await fetch('http://localhost:3005/colors');
      if (!response.ok) {
        throw new Error('Failed to fetch colors');
      }
      const data = await response.json();
      setColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      itemId: '',
      name: '',
      description: '',
      price: '',
      priceUsd: '',
      quantity: '',
      image: '',
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
    });
  };

  const handleShowExcelUpload = () => {
    setShowExcelUpload(true);
  };

  const handleCancelExcelUpload = () => {
    setShowExcelUpload(false);
  };

  const handleUploadExcel = (fileData) => {
    // Lógica para procesar archivo Excel
  };

  

  return (
    <div className="card">
      <div className="card-header">
        {!showExcelUpload && (
          <button className="btn btn-secondary" onClick={handleShowExcelUpload}>
            Agregar Excel
          </button>
        )}
        {showExcelUpload && (
          <div>
            <ExcelUpload onUpload={handleUploadExcel} />
            <button className="btn btn-secondary" onClick={handleCancelExcelUpload}>
              Cancelar
            </button>
          </div>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="itemId" className="form-label">Item ID :</label>
            <input type="text" id="itemId" name="itemId" className="form-control" value={formData.itemId} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Categoría:</label>
            <select id="categoryId" name="categoryId" className="form-control" value={formData.categoryId} onChange={handleChange}>
              <option value="">Seleccione una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="brandId" className="form-label">Marca:</label>
            <select id="brandId" name="brandId" className="form-control" value={formData.brandId} onChange={handleChange}>
              <option value="">Seleccione una marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="colorId" className="form-label">Color:</label>
            <select id="colorId" name="colorId" className="form-control" value={formData.colorId} onChange={handleChange}>
              <option value="">Seleccione un color</option>
              {colors.map(color => (
                <option key={color.id} value={color.id}>{color.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="capacityId" className="form-label">Capacidad:</label>
            <select id="capacityId" name="capacityId" className="form-control" value={formData.capacityId} onChange={handleChange}>
              <option value="">Seleccione una capacidad</option>
              {capacities.map(capacity => (
                <option key={capacity.id} value={capacity.id}>{capacity.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="subcategoryId" className="form-label">Subcategoría:</label>
            <select id="subcategoryId" name="subcategoryId" className="form-control" value={formData.subcategoryId} onChange={handleChange}>
              <option value="">Seleccione una subcategoría</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción:</label>
            <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio:</label>
            <input type="number" id="price" name="price" className="form-control" value={formData.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="priceUsd" className="form-label">Precio en USD:</label>
            <input type="number" id="priceUsd" name="priceUsd" className="form-control" value={formData.priceUsd} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Cantidad:</label>
            <input type="number" id="quantity" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Imagen URL:</label>
            <input type="text" id="image" name="image" className="form-control" value={formData.image} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="guarantee" className="form-label">Garantía:</label>
            <input type="text" id="guarantee" name="guarantee" className="form-control" value={formData.guarantee} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">Moneda:</label>
            <input type="text" id="currency" name="currency" className="form-control" value={formData.currency} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tax" className="form-label">Impuesto:</label>
            <input type="number" id="tax" name="tax" className="form-control" value={formData.tax} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="barcode" className="form-label">Código de Barras:</label>
            <input type="text" id="barcode" name="barcode" className="form-control" value={formData.barcode} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">Descuento:</label>
            <input type="number" id="discount" name="discount" className="form-control" value={formData.discount} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
