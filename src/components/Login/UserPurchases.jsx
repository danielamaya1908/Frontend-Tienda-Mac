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
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No se encontró el token en localStorage.');
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/auth/purchases', {
          headers: { 'x-auth-token': token },
        });

        const purchasesData = response.data;
        setPurchases(purchasesData.map(purchase => ({
          ...purchase,
          date: new Date(purchase.createdAt),
          productName: purchase.Product ? purchase.Product.name : 'No hay producto relacionado',
          productUrl: purchase.Product ? `/products/${purchase.Product.id}` : '#',
        })));

        // Fetch images for each product
        const imageRequests = purchasesData.map(async (purchase) => {
          if (purchase.Product && purchase.Product.id) {
            try {
              const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${purchase.Product.id}/images`);
              const imageFileNames = imageResponse.data;
              const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
              return { [purchase.id]: imageUrls };
            } catch (error) {
              console.error(`Error getting images for product ${purchase.Product.id}:`, error);
              return { [purchase.id]: [] };
            }
          }
          return { [purchase.id]: [] };
        });

        const images = await Promise.all(imageRequests);
        const imagesMap = images.reduce((acc, imageObj) => ({ ...acc, ...imageObj }), {});
        setProductImages(imagesMap);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError('Error al obtener las compras.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // ... (resto de las funciones sin cambios)

  return (
    <>
      <Navbar />
      <div className="user-purchases-container">
        {/* ... (filtros y otros elementos sin cambios) */}
        {filteredAndSortedPurchases.map((purchase) => (
          <div className="purchase-card card" key={purchase.id}>
            <div className="row g-3">
              <div className="col-md-8">
                {/* ... (detalles de la compra sin cambios) */}
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                {productImages[purchase.id] && productImages[purchase.id][0] ? (
                  <img 
                    src={productImages[purchase.id][0]} 
                    alt={purchase.productName} 
                    className="product-image"
                    onClick={() => handleImageClick(productImages[purchase.id][0])}
                  />
                ) : (
                  <p className="purchase-item">No hay imagen disponible.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

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
    </>
  );
};

export default UserPurchases;