import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

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

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 10; // Reduced for better mobile view
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <MenuDashboard />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Productos</h1>
                        <button className="btn btn-primary" onClick={() => setShowProductForm(!showProductForm)}>
                            {showProductForm ? 'Cerrar Formulario' : 'Agregar Producto'}
                        </button>
                    </div>
                    {showProductForm && <ProductForm onSubmit={handleAddProduct} onClose={() => setShowProductForm(false)} />}
                    {editProductId && <ProductUpdate productId={editProductId} onClose={handleCloseEdit} />}
                    {selectedProduct && <ProductDetail product={selectedProduct} />}
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Item ID</th>
                                            <th>Nombre</th>
                                            <th className="d-none d-lg-table-cell">Marca</th>
                                            <th>Precio</th>
                                            <th className="d-none d-md-table-cell">Cantidad</th>
                                            <th className="d-none d-lg-table-cell">Garantía</th>
                                            <th className="d-none d-xl-table-cell">Moneda</th>
                                            <th className="d-none d-xl-table-cell">Código de barras</th>

                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.itemId}</td>
                                                <td>{product.name}</td>
                                                <td className="d-none d-lg-table-cell">{product.brandName}</td>
                                                <td>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product.price)}</td>
                                                <td className="d-none d-md-table-cell">{product.quantity}</td>
                                                <td className="d-none d-lg-table-cell">{product.guarantee}</td>
                                                <td className="d-none d-xl-table-cell">{product.currency}</td>
                                                <td className="d-none d-xl-table-cell">{product.barcode}</td>

                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button className="btn btn-outline-info btn-sm" onClick={() => handleShowDetails(product.id)} title="Ver detalles">
                                                            <Eye size={16} />
                                                        </button>
                                                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditProduct(product.id)} title="Editar">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(product.id)} title="Eliminar">
                                                            <Trash2 size={16} />
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
                                <nav aria-label="Product pagination">
                                    <ul className="pagination pagination-sm m-0 justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                                <ChevronLeft size={14} />
                                            </button>
                                        </li>
                                        {renderPageNumbers()}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                                <ChevronRight size={14} />
                                            </button>
                                        </li>
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

export default Product;