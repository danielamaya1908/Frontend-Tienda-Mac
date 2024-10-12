import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPurchases.css';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarAlt, faDollarSign, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const UserPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No se encontró el token en localStorage.');
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/auth/purchases', {
          headers: { 'x-auth-token': token },
        });

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

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/auth/me', {
          headers: { 'x-auth-token': token },
        });

        setUserInfo(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error al obtener los datos del usuario.');
      }
    };

    fetchPurchases();
    fetchUserData();
  }, []);

  const sortPurchases = (purchasesToSort) => {
    return purchasesToSort.sort((a, b) => (sortOrder === 'desc' ? b.date - a.date : a.date - b.date));
  };

  const filterPurchases = (purchasesToFilter) => {
    return purchasesToFilter.filter(purchase => {
      const statusMatch = filterStatus === 'all' || purchase.status === filterStatus;
      const dateMatch =
        (!dateRange.start || purchase.date >= new Date(dateRange.start)) &&
        (!dateRange.end || purchase.date <= new Date(dateRange.end));
      return statusMatch && dateMatch;
    });
  };

  const handleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
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

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (purchases.length === 0) return <p className="no-purchases">No se encontraron compras.</p>;

  const filteredAndSortedPurchases = sortPurchases(filterPurchases(purchases));

  // Pagination logic
  const indexOfLastPurchase = currentPage * itemsPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - itemsPerPage;
  const currentPurchases = filteredAndSortedPurchases.slice(indexOfFirstPurchase, indexOfLastPurchase);
  const totalPages = Math.ceil(filteredAndSortedPurchases.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="main-title" style={{ color: 'black' }}>Mis Compras</h2>
        <div className="filters">
          <button onClick={handleSort} className="sort-button">
            <FontAwesomeIcon icon={faSort} /> Ordenar por fecha ({sortOrder === 'desc' ? 'Más reciente' : 'Más antiguo'})
          </button>
          {/*  <select onChange={handleFilterChange} value={filterStatus} className="filter-select">
            <option value="all">Todos los estados</option>
            <option value="charge_pending">Pendiente</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select> */}
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
                  {/*  <span className={`purchase-status ${purchase.status}`}>
                    <FontAwesomeIcon icon={faCheckCircle} /> {purchase.status}
                  </span> */}
                </div>
                <p className="purchase-item"><strong>Producto:</strong> {purchase.productName}</p>
                <p className="purchase-item"><strong>Descripción:</strong> {purchase.description}</p>
                <p className="purchase-item">
                  <FontAwesomeIcon icon={faDollarSign} className="icon" />
                  <strong>Monto:</strong> {formatPrice(purchase.amount)} {purchase.currency}
                </p>
                <p className="purchase-item"><strong>Método de Pago:</strong> {purchase.payment_method}</p>
                <p className="purchase-item"><strong>Referencia:</strong> {purchase.reference}</p>
                <p className="purchase-item"><strong>ID de Cargo:</strong> {purchase.charge_id}</p>

                {/* Mostrar la información del usuario dentro de la tarjeta de compra */}
                {userInfo && (
                  <>
                    <p className="purchase-item"><strong>Nombre:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                    <p className="purchase-item"><strong>Número de Documento:</strong> {userInfo.documentNumber}</p>
                    <p className="purchase-item"><strong>Número de Teléfono:</strong> {userInfo.phoneNumber}</p>
                    <p className="purchase-item"><strong>Dirección:</strong> {userInfo.address}</p>
                    <p className="purchase-item"><strong>Ciudad:</strong> {userInfo.city}</p>
                  </>
                )}
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
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Body>
          <img src={selectedImage} alt="Imagen del producto" className="modal-img" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default UserPurchases;