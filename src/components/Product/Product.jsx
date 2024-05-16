import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Product/ProductForm';
import ProductUpdate from '../Product/ProductUpdate';
import ProductDetail from './ProductDetail';
import MenuDashboard from '../MenuDashboard/MenuDashboard';
import Pagination from '../Paginado/Pagination'; // Importa el componente Pagination

const Product = () => {
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para la cantidad de elementos por página

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage]); // Actualiza la lista de productos cuando cambia la página o la cantidad de elementos por página

    useEffect(() => {
        if (selectedProductId) {
            fetchProduct(selectedProductId);
        } else {
            setSelectedProduct(null);
        }
    }, [selectedProductId]);

    const fetchProducts = async () => {
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            const response = await axios.get(`http://localhost:3005/product?_page=${currentPage}&_limit=${itemsPerPage}`);
            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error('Error fetching products: response data is not an array');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3005/product/${productId}`);
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

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3005/product/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3005/product', formData);
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
                        <hr></hr>
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                          totalItems={products.length} // Puedes usar products.length si no tienes la cantidad total de productos disponible
                          itemsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                          defaultItemsPerPage={10}
                          onPageChange={(page, itemsPerPage) => {
                              setCurrentPage(page);
                              setItemsPerPage(itemsPerPage);
                          }}
                        />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Product;
