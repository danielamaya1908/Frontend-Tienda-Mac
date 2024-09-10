import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de tener react-bootstrap instalado

const SoporteTecnicoDetalle = () => {
  const { id } = useParams();
  const [soporte, setSoporte] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoporteTecnico = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado');
          return;
        }

        const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/soporte-tecnico/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          console.log('Datos del soporte técnico:', response.data);
          setSoporte(response.data);

          // Asumiendo que `response.data` ahora incluye la información del usuario bajo `response.data.User`
          if (response.data.User) {
            setUser(response.data.User);
          }
        } else {
          console.error('Error al obtener los detalles del soporte técnico:', response);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del soporte técnico:', error);
      }
    };

    fetchSoporteTecnico();
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (!soporte) {
    return (
      <div>
        <div className="container mt-4">
          <p>Cargando detalles...</p>
        </div>
      </div>
    );
  }

  console.log('Imágenes del soporte:', soporte.ImageSoporteTecnicos);

  return (
    <div>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Detalles del Soporte Técnico #{soporte.id}</h1>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Marca</th>
                  <td>{soporte.marca}</td>
                </tr>
                <tr>
                  <th>Modelo</th>
                  <td>{soporte.modelo}</td>
                </tr>
                <tr>
                  <th>Serial</th>
                  <td>{soporte.serial}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{soporte.estado}</td>
                </tr>
                <tr>
                  <th>Fecha de Ingreso</th>
                  <td>{new Date(soporte.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                <th>Fecha de Salida</th>
                <td>{soporte.fechaSalida ? new Date(soporte.fechaSalida).toLocaleDateString() : 'No disponible'}</td>
              </tr>
                <tr>
                  <th>Garantía</th>
                  <td>{soporte.garantia ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Rayones</th>
                  <td>{soporte.rayones ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Golpes</th>
                  <td>{soporte.golpes ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Enciende</th>
                  <td>{soporte.enciende ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Parlantes</th>
                  <td>{soporte.parlantes ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Auricular</th>
                  <td>{soporte.auricular ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Bluetooth</th>
                  <td>{soporte.bluetooth ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Botones</th>
                  <td>{soporte.botones ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Cámara</th>
                  <td>{soporte.camara ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Pin de Carga</th>
                  <td>{soporte.pinCarga ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Puertos</th>
                  <td>{soporte.puertos ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Teclado</th>
                  <td>{soporte.teclado ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Wifi</th>
                  <td>{soporte.wifi ? 'Sí' : 'No'}</td>
                </tr>
                <tr>
                  <th>Pantalla</th>
                  <td>{soporte.pantalla ? 'Sí' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h3>Información del Usuario:</h3>
            {user ? (
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{user.firstName} {user.lastName}</td>
                  </tr>
                  <tr>
                    <th>Documento</th>
                    <td>{user.documentNumber}</td>
                  </tr>
                  <tr>
                    <th>Teléfono</th>
                    <td>{user.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Dirección</th>
                    <td>{user.address}</td>
                  </tr>
                  <tr>
                    <th>Ciudad</th>
                    <td>{user.city}</td>
                  </tr>
                  <tr>
                    <th>País</th>
                    <td>{user.country}</td>
                  </tr>
                  <tr>
                    <th>Código Postal</th>
                    <td>{user.zipCode}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No hay información del usuario disponible.</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3>Imágenes del Estado:</h3>
            {soporte.ImageSoporteTecnicos && Array.isArray(soporte.ImageSoporteTecnicos) && soporte.ImageSoporteTecnicos.length > 0 ? (
              <div className="d-flex flex-wrap">
                {soporte.ImageSoporteTecnicos.map((imagen, index) => {
                  const imageUrl = `https://backend-tienda-mac-production.up.railway.app${imagen.url}`;
                  console.log('URL de la imagen:', imageUrl);
                  return (
                    <div key={index} className="m-2" style={{ position: 'relative', cursor: 'pointer' }}>
                      <img 
                        src={imageUrl} 
                        alt={`Estado ${index + 1}`} 
                        className="img-thumbnail" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                        onClick={() => handleImageClick(imageUrl)} 
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No hay imágenes del estado disponibles.</p>
            )}
          </div>
        </div>

        {/* Modal para mostrar imagen en grande */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Imagen del Estado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <img 
              src={selectedImage} 
              alt="Imagen Grande" 
              className="img-fluid" 
              style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SoporteTecnicoDetalle;
