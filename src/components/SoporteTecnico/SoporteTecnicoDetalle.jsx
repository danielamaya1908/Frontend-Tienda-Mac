import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaMobileAlt,
  FaTools,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaCamera,
  FaBluetooth,
  FaWifi,
  FaKeyboard,
  FaVolumeUp,
  FaHeadphones,
  FaPowerOff,
  FaPlug,
  FaUsb,
  FaTv,
  FaExclamationTriangle,
  FaLaptopCode,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SoporteTecnicoDetalle = () => {
  const { id } = useParams();
  const [soporte, setSoporte] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [estadoImages, setEstadoImages] = useState({});
  const [imagenesIngreso, setImagenesIngreso] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  const API_BASE_URL = "https://backend-tienda-mac-production.up.railway.app";
  const MAX_RETRIES = 3;

  const estados = [
    "Ingreso",
    "En diagnóstico",
    "En espera de aprobación cliente",
    "En reparación",
    "Listo para entregar",
    "Entregado",
  ];

  const checkAuthentication = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No se encontró token de autenticación");
        navigate("/login", {
          replace: true,
          state: { from: location.pathname }, // Para redirigir de vuelta después del login
        });
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      setError("Error de autenticación. Por favor, inicie sesión nuevamente.");
      navigate("/login", { replace: true });
      return null;
    }
  };

  const handleApiError = (error) => {
    console.error("API Error:", error);
    const errorMessage =
      error.response?.data?.message ||
      "Error al cargar los detalles del soporte técnico";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } else if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      setTimeout(fetchSoporteTecnico, 1000 * (retryCount + 1));
    } else {
      setError(errorMessage);
    }
  };

  const fetchSoporteTecnico = async () => {
    if (isLoading && retryCount === 0) setIsLoading(true);
    setError(null);

    const token = checkAuthentication();
    if (!token) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        timeout: 10000,
      };

      const [soporteResponse, imagenesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/soporte-tecnico/${id}`, config),
        axios.get(`${API_BASE_URL}/soporte-tecnico/${id}/latest-image`, config),
      ]);

      if (soporteResponse.data) {
        setSoporte(soporteResponse.data);
        setUser(soporteResponse.data.User);

        // Modificar el manejo de las imágenes de ingreso
        if (soporteResponse.data.ImageSoporteTecnicos) {
          const imagenesIngresoModificadas =
            soporteResponse.data.ImageSoporteTecnicos.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
              .slice(0, 10)
              .map((img) => ({
                ...img,
                url: img.url.startsWith("http")
                  ? img.url
                  : `${API_BASE_URL}${img.url}`,
              }));
          setImagenesIngreso(imagenesIngresoModificadas);
        }

        // Modificar el manejo de las imágenes de estado
        if (imagenesResponse.data.imagenes) {
          const imagenes = imagenesResponse.data.imagenes
            .sort((a, b) => new Date(a.fechaSubida) - new Date(b.fechaSubida))
            .map((img) => ({
              ...img,
              url: img.url.startsWith("http")
                ? img.url
                : `${API_BASE_URL}${img.url}`,
            }));

          const newEstadoImages = {
            EnDiagnostico: [],
            EnReparacion: [],
            ListoParaEntregar: [],
            Entregado: [],
          };

          const estadosConImagenes = [
            "En diagnóstico",
            "En reparación",
            "Listo para entregar",
            "Entregado",
          ];

          imagenes.forEach((imagen, index) => {
            const estado =
              estadosConImagenes[
                Math.min(index, estadosConImagenes.length - 1)
              ];
            if (estado) {
              newEstadoImages[estado].push(imagen);
            }
          });

          setEstadoImages(newEstadoImages);
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSoporteTecnico();

    // Cleanup function
    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, [id]);

  const handleImageClick = (imageUrl) => {
    try {
      setSelectedImage(imageUrl);
      setShowModal(true);
    } catch (error) {
      console.error("Error al mostrar imagen:", error);
      setError("Error al cargar la imagen. Por favor, intente nuevamente.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Ingreso":
        return "#007bff";
      case "EnDiagnostico":
        return "#ffc107";
      case "EnEsperaDeAprobacionCliente":
        return "#dc3545";
      case "EnReparacion":
        return "#17a2b8";
      case "ListoParaEntregar":
        return "#28a745";
      case "Entregado":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const TimelineItem = ({
    estado,
    imagenes,
    currentState,
    index,
    currentStateIndex,
    diagnosticoDescripcion,
  }) => {
    const getProgressBarVariant = (index, currentStateIndex) => {
      if (index < currentStateIndex) return "success";
      if (index === currentStateIndex) return "primary";
      return "secondary";
    };

    return (
      <Card
        className={`mb-3 ${
          currentState === estado ? "border-primary border-5" : ""
        }`}
      >
        <Card.Body>
          <div className="d-flex flex-column mb-2">
            <Card.Title
              className={
                currentState === estado ? "text-primary font-weight-bold" : ""
              }
            >
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
            style={{ height: "10px", marginBottom: "1rem" }}
          />
          {estado === "EnEsperaDeAprobacionCliente" ? (
            <Card.Text>
              <FaExclamationTriangle className="text-warning me-2" />
              Esperando confirmación del cliente
            </Card.Text>
          ) : (
            <>
              {estado === "EnDiagnostico" && (
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      <FaLaptopCode className="me-2" />
                      Descripción del Diagnóstico
                    </Card.Title>
                    <Card.Text>
                      {diagnosticoDescripcion ||
                        "No hay descripción del diagnóstico disponible."}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}

              {estado === "ListoParaEntregar" && (
                <Card.Text>
                  <FaCheckCircle className="text-success me-2" />
                  El equipo está listo para ser recogido por el cliente
                </Card.Text>
              )}
              {imagenes && imagenes.length > 0 && (
                <Row xs={2} md={3} lg={4} className="g-2">
                  {imagenes.map((imagen, index) => (
                    <Col key={index}>
                      <Card.Img
                        src={imagen.url} // Cambiar esto - ya no necesitas concatenar API_BASE_URL
                        alt={`Estado ${estado}`}
                        onClick={() => handleImageClick(imagen.url)} // Cambiar esto también
                        style={{
                          cursor: "pointer",
                          border:
                            currentState === estado
                              ? "2px solid #007bff"
                              : "none",
                        }}
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

  if (isLoading) {
    return (
      <Container className="mt-4">
        <Card>
          <Card.Body className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando detalles del soporte técnico...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => navigate(-1)} variant="outline-danger">
              Volver
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!soporte) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <Alert.Heading>No se encontraron datos</Alert.Heading>
          <p>
            No se pudo encontrar la información del soporte técnico solicitado.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => navigate(-1)} variant="outline-warning">
              Volver
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  const imagenesPerEstado = {
    Ingreso: imagenesIngreso,
    EnDiagnostico: estadoImages.EnDiagnostico || [],
    EnEsperaDeAprobacionCliente: [],
    EnReparacion: estadoImages.EnReparacion || [],
    ListoParaEntregar: estadoImages.ListoParaEntregar || [],
    Entregado: estadoImages.Entregado || [],
  };

  const estadoIndex = estados.indexOf(soporte.estado);
  const progreso = ((estadoIndex + 1) / estados.length) * 100;

  return (
    <Container className="mt-4">
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
              <Badge
                bg="primary"
                style={{
                  fontSize: "1.5rem",
                  padding: "10px 20px",
                  display: "block",
                }}
              >
                <div>Estado Actual:</div>
                <br />
                <div>{soporte.estado}</div>
              </Badge>
            </h2>
          </Card.Title>
          <ProgressBar
            now={progreso}
            label={`${progreso.toFixed(0)}%`}
            className="mb-3"
            style={{ height: "30px", fontSize: "1.2rem" }}
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
              diagnosticoDescripcion={soporte.diagnosticoDescripcion}
            />
          ))}
        </Card.Body>
      </Card>

      <Row>
        <Col xs={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                <FaMobileAlt className="me-2" />
                Detalles del Dispositivo
              </Card.Title>
              <Table striped bordered hover>
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
              <Card.Title>
                <FaTools className="me-2" />
                Componentes
              </Card.Title>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>
                      <FaCamera /> Cámara
                    </th>
                    <td>
                      {soporte.camara ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaBluetooth /> Bluetooth
                    </th>
                    <td>
                      {soporte.bluetooth ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaWifi /> Wifi
                    </th>
                    <td>
                      {soporte.wifi ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaKeyboard /> Teclado
                    </th>
                    <td>
                      {soporte.teclado ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaVolumeUp /> Parlantes
                    </th>
                    <td>
                      {soporte.parlantes ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaHeadphones /> Auricular
                    </th>
                    <td>
                      {soporte.auricular ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaPowerOff /> Botones
                    </th>
                    <td>
                      {soporte.botones ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaPlug /> Pin de Carga
                    </th>
                    <td>
                      {soporte.pinCarga ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaUsb /> Puertos
                    </th>
                    <td>
                      {soporte.puertos ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <FaTv /> Pantalla
                    </th>
                    <td>
                      {soporte.pantalla ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
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
              <Card.Title>
                <FaTools className="me-2" />
                Fechas y Garantía
              </Card.Title>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>Fecha de Ingreso</th>
                    <td>{new Date(soporte.createdAt).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Salida</th>
                    <td>
                      {soporte.fechaSalida
                        ? new Date(soporte.fechaSalida).toLocaleDateString()
                        : "No disponible"}
                    </td>
                  </tr>
                  <tr>
                    <th>Garantía</th>
                    <td>
                      {soporte.garantia ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
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
              <Card.Title>
                <FaTools className="me-2" />
                Estado Físico
              </Card.Title>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>Rayones</th>
                    <td>
                      {soporte.rayones ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Golpes</th>
                    <td>
                      {soporte.golpes ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Enciende</th>
                    <td>
                      {soporte.enciende ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user && (
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  <FaUser className="me-2" />
                  Información del Usuario
                </Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{user.id}</td>
                    </tr>
                    <tr>
                      <th>Nombre</th>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
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
                      <th>Email</th>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Imagen del Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Imagen Grande"
            className="img-fluid"
            style={{
              maxHeight: "80vh",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SoporteTecnicoDetalle;
