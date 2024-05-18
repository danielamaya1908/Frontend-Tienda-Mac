import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUpdate = ({ productId, onClose }) => {
    const [productData, setProductData] = useState({
        itemId: '',
        name: '',
        description: '',
        price: 0,
        priceUsd: 0,
        quantity: 0,
        image: '',
        guarantee: '',
        currency: '',
        tax: '',
        barcode: '',
        categoryId: '',
        brandId: '',
    });

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/product/${productId}`);
            setProductData(response.data); // Suponiendo que la respuesta del backend es un objeto con los datos del producto
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://backend-tienda-mac-production.up.railway.app/product/${productId}`, productData);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container">
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="itemId" className="form-label">Item ID</label>
                    <input type="text" className="form-control" id="itemId" name="itemId" value={productData.itemId} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" value={productData.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" name="description" value={productData.description} onChange={handleInputChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="price" name="price" value={productData.price} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="priceUsd" className="form-label">Precio USD</label>
                    <input type="number" className="form-control" id="priceUsd" name="priceUsd" value={productData.priceUsd} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Cantidad</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" value={productData.quantity} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="text" className="form-control" id="image" name="image" value={productData.image} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="guarantee" className="form-label">Garantía</label>
                    <input type="text" className="form-control" id="guarantee" name="guarantee" value={productData.guarantee} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="currency" className="form-label">Moneda</label>
                    <input type="text" className="form-control" id="currency" name="currency" value={productData.currency} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tax" className="form-label">Impuesto</label>
                    <input type="text" className="form-control" id="tax" name="tax" value={productData.tax} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="barcode" className="form-label">Código de barras</label>
                    <input type="text" className="form-control" id="barcode" name="barcode" value={productData.barcode} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">ID de Categoría</label>
                    <input type="text" className="form-control" id="categoryId" name="categoryId" value={productData.categoryId} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="brandId" className="form-label">ID de Marca</label>
                    <input type="text" className="form-control" id="brandId" name="brandId" value={productData.brandId} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Producto</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default ProductUpdate;
