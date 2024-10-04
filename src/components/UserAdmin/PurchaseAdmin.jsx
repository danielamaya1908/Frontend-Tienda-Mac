import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PurchaseAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import MenuDashboard from '../MenuDashboard/MenuDashboard';

const PurchaseAdmin = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage] = useState(10);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/adminpurchases');
        const purchasesWithImages = response.data.map(purchase => {
          const product = purchase.Product;
          const imageName = product && product.Image ? product.Image.path.split('/').pop() : null;
          return {
            ...purchase,
            date: new Date(purchase.createdAt),
            productName: product ? product.name : 'No hay producto relacionado',
            imageUrl: imageName
              ? `https://backend-tienda-mac-production.up.railway.app/images/${imageName}`
              : null,
            customerName: purchase.customer_name,
            customerEmail: purchase.customer_email,
            customerPhone: purchase.customer_phone,
            customerCity: purchase.customer_city,
            customerDepartment: purchase.customer_department,
            customerAddress: purchase.customer_address,
            customerDocumentNumber: purchase.customer_document_number,
            productDescription: product ? product.description : 'No hay descripción disponible'
          };
        });

        setPurchases(purchasesWithImages);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError('Error al obtener las compras.');
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const sortPurchases = (purchasesToSort) => {
    return purchasesToSort.sort((a, b) => {
      return sortOrder === 'desc' ? b.date - a.date : a.date - b.date;
    });
  };

  const filterPurchases = (purchasesToFilter) => {
    return purchasesToFilter.filter(purchase => {
      return (!dateRange.start || purchase.date >= new Date(dateRange.start)) &&
        (!dateRange.end || purchase.date <= new Date(dateRange.end));
    });
  };

  const handleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const formatPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const toggleDescription = (purchaseId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [purchaseId]: !prev[purchaseId]
    }));
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (purchases.length === 0) return <p className="no-purchases">No se encontraron compras.</p>;

  const filteredAndSortedPurchases = sortPurchases(filterPurchases(purchases));

  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = filteredAndSortedPurchases.slice(indexOfFirstPurchase, indexOfLastPurchase);
  const totalPages = Math.ceil(filteredAndSortedPurchases.length / purchasesPerPage);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <MenuDashboard />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container">
              <h2 className="main-title">Compras</h2>
              <div className="filters">
                <button onClick={handleSort} className="sort-button">
                  <FontAwesomeIcon icon={faSort} /> Ordenar por fecha ({sortOrder === 'desc' ? 'Más reciente' : 'Más antiguo'})
                </button>
                <div className="date-range">
                  <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                  <input
                    type="date"
                    name="start"
                    value={dateRange.start}
                    onChange={handleDateChange}
                    className="date-input"
                  />
                  <span>a</span>
                  <input
                    type="date"
                    name="end"
                    value={dateRange.end}
                    onChange={handleDateChange}
                    className="date-input"
                  />
                </div>
              </div>
              {currentPurchases.map((purchase) => (
                <div className="purchase-card card" key={purchase.id}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <div className="purchase-header">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                        <span className="purchase-date">{purchase.date.toLocaleDateString()}</span>
                      </div>
                      <p className="purchase-item"><strong>Producto:</strong> {purchase.productName}</p>
                      <p className="purchase-item"><strong>Nombre del Cliente:</strong> {purchase.customerName}</p>
                      <p className="purchase-item"><strong>Email del Cliente:</strong> {purchase.customerEmail}</p>
                      <p className="purchase-item"><strong>Teléfono del Cliente:</strong> {purchase.customerPhone}</p>
                      <p className="purchase-item"><strong>Ciudad del Cliente:</strong> {purchase.customerCity}</p>
                      <p className="purchase-item"><strong>Departamento del Cliente:</strong> {purchase.customerDepartment}</p>
                      <p className="purchase-item"><strong>Dirección del Cliente:</strong> {purchase.customerAddress}</p>
                      <p className="purchase-item"><strong>Número de Documento:</strong> {purchase.customerDocumentNumber}</p>
                      <p className="purchase-item">
                        <FontAwesomeIcon icon={faDollarSign} className="icon" />
                        <strong>Monto:</strong> {formatPrice(purchase.amount)} {purchase.currency}
                      </p>
                      <p className="purchase-item"><strong>Método de Pago:</strong> {purchase.payment_method}</p>
                      <p className="purchase-item"><strong>Referencia:</strong> {purchase.reference}</p>
                      <p className="purchase-item"><strong>ID de Cargo:</strong> {purchase.charge_id}</p>
                      <p className="purchase-item">
                        <strong>Descripción:</strong>
                        {expandedDescriptions[purchase.id]
                          ? purchase.productDescription
                          : `${purchase.productDescription.slice(0, 100)}...`}
                        <button
                          onClick={() => toggleDescription(purchase.id)}
                          className="btn btn-link"
                        >
                          {expandedDescriptions[purchase.id] ? 'Ver menos' : 'Ver más'}
                        </button>
                      </p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                      {purchase.imageUrl ? (
                        <img
                          src={purchase.imageUrl}
                          alt={purchase.productName}
                          className="product-image"
                          onClick={() => handleImageClick(purchase.imageUrl)}
                        />
                      ) : (
                        <p className="purchase-item">No hay imagen disponible.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
                  </li>
                </ul>
              </nav>
            </div>
          </main>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Imagen del Producto" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PurchaseAdmin;