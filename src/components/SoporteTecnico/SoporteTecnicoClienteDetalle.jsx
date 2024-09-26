import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ProgressBar, Modal, Table, Badge } from 'react-bootstrap';
import { 
  FaArrowLeft, FaMobileAlt, FaTools, FaUser, FaCheckCircle, 
  FaTimesCircle, FaCamera, FaBluetooth, FaWifi, FaKeyboard, FaVolumeUp, 
  FaHeadphones, FaPowerOff, FaPlug, FaUsb, FaTv, FaExclamationTriangle
} from 'react-icons/fa';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = 'https://backend-tienda-mac-production.up.railway.app';

const SoporteTecnicoClienteDetalle = () => {
  const { id } = useParams();
  const [soporte, setSoporte] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [estadoImages, setEstadoImages] = useState({});
  const [imagenesIngreso, setImagenesIngreso] = useState([]);
  const navigate = useNavigate();

  const estados = ['Ingreso', 'Diagnosticando', 'Pendiente', 'Reparando', 'Reparado', 'Entregado'];

  useEffect(() => {
    const fetchSoporteTecnico = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado');
          return;
        }

        const response = await axios.get(`${BASE_URL}/soportetecnicocliente/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setSoporte(response.data);

          // Fetch ingreso images
          if (response.data.ImageSoporteTecnicos) {
            const imagenesIngreso = response.data.ImageSoporteTecnicos
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .slice(0, 10);
            setImagenesIngreso(imagenesIngreso);
          }

          // Fetch images for other states
          const latestImageResponse = await axios.get(`${BASE_URL}/soporte-tecnico/${id}/latest-image`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (latestImageResponse.status === 200 && latestImageResponse.data.imagenes) {
            const imagenes = latestImageResponse.data.imagenes.sort((a, b) => 
              new Date(a.fechaSubida) - new Date(b.fechaSubida)
            );
            
            const newEstadoImages = {
              Diagnosticando: [],
              'Reparando': [],
              'Reparado': [],
              Entregado: []
            };

            const estadosConImagenes = ['Diagnosticando', 'Reparando', 'Reparado', 'Entregado'];
            let estadoIndex = 0;

            imagenes.forEach(imagen => {
              if (estadoIndex < estadosConImagenes.length) {
                newEstadoImages[estadosConImagenes[estadoIndex]].push(imagen);
                estadoIndex++;
              }
            });
            
            setEstadoImages(newEstadoImages);
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

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Ingreso': return '#007bff';
      case 'Diagnosticando': return '#ffc107';
      case 'Pendiente': return '#dc3545';
      case 'Reparando': return '#17a2b8';
      case 'Reparado': return '#28a745';
      case 'Entregado': return '#28a745';
      default: return '#6c757d';
    }
  };

  const TimelineItem = ({ estado, imagenes, currentState, index, currentStateIndex }) => {
    const getProgressBarVariant = (index, currentStateIndex) => {
      if (index < currentStateIndex) return "success";
      if (index === currentStateIndex) return "primary";
      return "secondary";
    };
  
    return (
      <Card className={`mb-3 ${currentState === estado ? 'border-primary border-5' : ''}`}>
        <Card.Body>
          <div className="d-flex flex-column mb-2">
            <Card.Title className={currentState === estado ? 'text-primary font-weight-bold' : ''}>
              {estado}
            </Card.Title>
            {currentState === estado && (
              <Badge bg="primary" className="p-2 align-self-start mt-2">
                <FaExclamationTriangle className="me-1" />
                Estado Actual
              </Badge>
            )}
          </div>
          <ProgressBar 
            now={100} 
            variant={getProgressBarVariant(index, currentStateIndex)}
            style={{height: '10px', marginBottom: '1rem'}}
          />
          {estado === 'Pendiente' ? (
            <Card.Text>
              <FaExclamationTriangle className="text-warning me-2" />
              Esperando su confirmación 
            </Card.Text>
          ) : (
            <>
              {estado === 'Reparado' && (
                <Card.Text>
                  <FaCheckCircle className="text-success me-2" />
                  Su equipo está listo para ser recogido
                </Card.Text>
              )}
              {imagenes && imagenes.length > 0 && (
                <Row xs={2} md={3} lg={4} className="g-2">
                  {imagenes.map((imagen, index) => (
                    <Col key={index}>
                      <Card.Img
                        src={`${BASE_URL}${imagen.url}`}
                        alt={`Estado ${estado}`}
                        onClick={() => handleImageClick(`${BASE_URL}${imagen.url}`)}
                        style={{ cursor: 'pointer', border: currentState === estado ? '2px solid #007bff' : 'none' }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!soporte) {
    return (
      <div>
        <Navbar />
        <Container className="mt-4">
          <p>Cargando detalles...</p>
        </Container>
        <Footer />
      </div>
    );
  }

  const imagenesPerEstado = {
    Ingreso: imagenesIngreso,
    Diagnosticando: estadoImages.Diagnosticando || [],
    Pendiente: [],
    'Reparando': estadoImages['Reparando'] || [],
    'Reparado': estadoImages['Reparado'] || [],
    Entregado: estadoImages.Entregado || []
  };

  const estadoIndex = estados.indexOf(soporte.estado);
  const progreso = ((estadoIndex + 1) / estados.length) * 100;

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-center mb-4">
          <FaMobileAlt className="me-2" />
          Soporte Técnico #{soporte.id}
        </h1>
        <Button variant="primary" className="mb-4" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Volver
        </Button>

        <Card className="mb-4 border-primary">
          <Card.Body>
            <Card.Title className="text-center mb-4">
            <h2>
              <Badge bg="primary" style={{fontSize: '1.5rem', padding: '10px 20px', display: 'block'}}>
                <div>Estado Actual:</div>
                <br/>
                <div>{soporte.estado}</div>
              </Badge>
            </h2>
            </Card.Title>
            <ProgressBar 
              now={progreso} 
              label={`${progreso.toFixed(0)}%`} 
              className="mb-3" 
              style={{height: '30px', fontSize: '1.2rem'}}
            />
            {estados.map((estado, index) => (
              <TimelineItem
                key={estado}
                estado={estado}
                activo={index <= estadoIndex}
                imagenes={imagenesPerEstado[estado]}
                currentState={soporte.estado}
                index={index}
                currentStateIndex={estadoIndex}
              />
            ))}
          </Card.Body>
        </Card>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title><FaMobileAlt className="me-2" />Detalles del Dispositivo</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr><th>Marca</th><td>{soporte.marca}</td></tr>
                    <tr><th>Modelo</th><td>{soporte.modelo}</td></tr>
                    <tr><th>Serial</th><td>{soporte.serial}</td></tr>
                    <tr><th>Estado</th><td>{soporte.estado}</td></tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title><FaTools className="me-2" />Componentes</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th><FaCamera /> Cámara</th>
                      <td>{soporte.camara ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaBluetooth /> Bluetooth</th>
                      <td>{soporte.bluetooth ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaWifi /> Wifi</th>
                      <td>{soporte.wifi ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaKeyboard /> Teclado</th>
                      <td>{soporte.teclado ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaVolumeUp /> Parlantes</th>
                      <td>{soporte.parlantes ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaHeadphones /> Auricular</th>
                      <td>{soporte.auricular ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaPowerOff /> Botones</th>
                      <td>{soporte.botones ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaPlug /> Pin de Carga</th>
                      <td>{soporte.pinCarga ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaUsb /> Puertos</th>
                      <td>{soporte.puertos ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th><FaTv /> Pantalla</th>
                      <td>{soporte.pantalla ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title><FaTools className="me-2" />Fechas y Garantía</Card.Title>
                <Table striped bordered hover>
                  <tbody>
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
                      <td>{soporte.garantia ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
          <Card className="mb-4">
              <Card.Body>
                <Card.Title><FaTools className="me-2" />Fechas y Garantía</Card.Title>
                <Table striped bordered hover>
                  <tbody>
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
                      <td>{soporte.garantia ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title><FaTools className="me-2" />Estado Físico</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>Rayones</th>
                      <td>{soporte.rayones ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th>Golpes</th>
                      <td>{soporte.golpes ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                    <tr>
                      <th>Enciende</th>
                      <td>{soporte.enciende ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Imagen del Estado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
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
      </Container>
      <Footer />
    </div>
  );
};

export default SoporteTecnicoClienteDetalle;