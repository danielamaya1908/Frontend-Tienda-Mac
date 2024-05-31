import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Product/ProductForm';
import ProductUpdate from '../Product/ProductUpdate';
import ProductDetail from './ProductDetail';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const Product = () => {
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedProductId) {
            fetchProduct(selectedProductId);
        } else {
            setSelectedProduct(null);
        }
    }, [selectedProductId]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/product/${productId}`);
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleEditProduct = (productId) => {
        setEditProductId(productId);
    };

    const handleCloseEdit = () => {
        setEditProductId(null);
    };
    
    const handleToggleProductStatus = async (productId, newStatus) => {
        try {
          const response = await axios.put(`https://backend-tienda-mac-production.up.railway.app/products/${productId}/status`, { isActive: newStatus });
          console.log(response.data.message); // 'Product status updated successfully'
          fetchProducts(); // Actualiza la lista de productos después de cambiar el estado
        } catch (error) {
          console.error('Error updating product status:', error);
        }
      };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`https://backend-tienda-mac-production.up.railway.app/product/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = async (formData) => {
        try {
            const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/product', formData);
            if (response.status === 201) {
                fetchProducts();
                setShowProductForm(false);
            } else {
                console.error('Error adding product: unexpected response status', response.status);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleShowDetails = (productId) => {
        setSelectedProductId(productId);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <MenuDashboard />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <button className="btn btn-primary" onClick={() => setShowProductForm(!showProductForm)}>
                                {showProductForm ? 'Cerrar Formulario' : 'Agregar Producto'}
                            </button>
                        </div>
                        {showProductForm && <ProductForm onSubmit={handleAddProduct} onClose={() => setShowProductForm(false)} />}
                        {editProductId && <ProductUpdate productId={editProductId} onClose={handleCloseEdit} />}
                        {selectedProduct && <ProductDetail product={selectedProduct} />}
                        <h2>Lista de Productos</h2>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Precio USD</th>
                                        <th>Cantidad</th>
                                        <th>Garantía</th>
                                        <th>Moneda</th>
                                        <th>Código de barras</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(products) && products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.itemId}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.priceUsd}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.guarantee}</td>
                                            <td>{product.tax}</td>
                                            <td>{product.barcode}</td>
                                            <td>
                                                <button className="btn btn-info" onClick={() => handleShowDetails(product.id)}>Detalle</button>
                                                <button className="btn btn-primary" onClick={() => handleEditProduct(product.id)}>Editar</button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                                                <button className="btn btn-secondary" onClick={() => handleToggleProductStatus(product.id, !product.isActive)}>
                                                    {product.isActive ? 'Desactivar' : 'Activar'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Product;
