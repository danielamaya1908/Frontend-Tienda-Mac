import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPurchases.css';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCalendarAlt, faDollarSign, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Image } from 'react-bootstrap';

const UserPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [productImages, setProductImages] = useState({});

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
          const imagePath = product && product.Image ? product.Image.path.split('\\').pop() : null;
          return {
            ...purchase,
            date: new Date(purchase.createdAt),
            productName: product ? product.name : 'No hay producto relacionado',
            imageUrl: imagePath ? `https://backend-tienda-mac-production.up.railway.app/images/${imagePath}` : null,
            productUrl: product ? `/products/${product.id}` : '#',
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

    const fetchProductImages = async () => {
      try {
        const imageRequests = purchases.map(async (purchase) => {
          try {
            const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${purchase.Product.id}/images`);
            const imageFileNames = response.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            return { [purchase.Product.id]: imageUrls };
          } catch (error) {
            console.error(`Error getting images for product ${purchase.Product.id}:`, error);
            return { [purchase.Product.id]: [] };
          }
        });

        const images = await Promise.all(imageRequests);
        const imagesMap = images.reduce((acc, imageObj) => ({ ...acc, ...imageObj }), {});
        setProductImages(imagesMap);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    fetchPurchases();
    fetchProductImages();
  }, []);

  const sortPurchases = (purchasesToSort) => {
    return purchasesToSort.sort((a, b) => {
      return sortOrder === 'desc' ? b.date - a.date : a.date - b.date;
    });
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
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
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

  const handleBuyAgain = (productUrl) => {
    if (productUrl) {
      window.location.href = productUrl;
    } else {
      console.error('Product URL is not defined.');
    }
  };

  const formatPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (purchases.length === 0) return <p className="no-purchases">No se encontraron compras.</p>;

  const filteredAndSortedPurchases = sortPurchases(filterPurchases(purchases));

  return (
    <>
      <Navbar />
      <div className="user-purchases-container">
        <h2 className="main-title">Mis Compras</h2>
        <div className="filters">
          <button onClick={handleSort} className="sort-button">
            <FontAwesomeIcon icon={faSort} /> Ordenar por fecha ({sortOrder === 'desc' ? 'Más reciente' : 'Más antiguo'})
          </button>
          <select onChange={handleFilterChange} value={filterStatus} className="filter-select">
            <option value="all">Todos los estados</option>
            <option value="completed">Completado</option>
            <option value="pending">Pendiente</option>
            <option value="cancelled">Cancelado</option>
          </select>
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
        {filteredAndSortedPurchases.map((purchase) => (
          <div className="purchase-card card" key={purchase.id}>
            <div className="row g-3">
              <div className="col-md-4">
                {productImages[purchase.Product.id] && productImages[purchase.Product.id][0] ? (
                  <Image
                    src={productImages[purchase.Product.id][0]} 
                    alt={purchase.productName} 
                    className="purchase-image" 
                    fluid 
                    onClick={() => handleImageClick(productImages[purchase.Product.id][0])}
                  />
                ) : (
                  <Image
                    src="ruta/a/imagen/default.jpg" 
                    alt={purchase.productName} 
                    className="purchase-image" 
                    fluid 
                    onClick={() => handleImageClick('ruta/a/imagen/default.jpg')}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="purchase-header">
                  <h5 className="purchase-product-name">{purchase.productName}</h5>
                  <p className="purchase-date">{purchase.date.toLocaleDateString()}</p>
                </div>
                <div className="purchase-info">
                  <p className="purchase-price">
                    <FontAwesomeIcon icon={faDollarSign} /> {formatPrice(purchase.totalAmount)}
                  </p>
                  <p className="purchase-status">
                    <FontAwesomeIcon icon={faCheckCircle} /> {purchase.status}
                  </p>
                  <Button variant="primary" onClick={() => handleBuyAgain(purchase.productUrl)}>
                    Comprar de nuevo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body>
          <Image src={selectedImage} alt="Imagen del producto" fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default UserPurchases;
