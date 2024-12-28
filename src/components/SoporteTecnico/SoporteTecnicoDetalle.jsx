import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import logo from "./Logo.png";
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
    "Diagnosticando",
    "Pendiente",
    "Reparando",
    "Reparado",
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

    // Establecer un mensaje de error genérico o proveniente del backend
    const errorMessage =
      error.response?.data?.message ||
      "Error al cargar los detalles del soporte técnico";

    if (retryCount < MAX_RETRIES) {
      // Reintentar si no se alcanzó el máximo de intentos
      setRetryCount((prev) => prev + 1);
      setTimeout(fetchSoporteTecnico, 1000 * (retryCount + 1));
    } else {
      // Si se agotan los intentos, mostrar el mensaje de error
      setError(errorMessage);
    }

    setIsLoading(false); // Finalizar el estado de carga
  };

  // Función principal para cargar los datos
  const fetchSoporteTecnico = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Configuración de la solicitud
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        timeout: 10000, // Tiempo límite de 10 segundos
      };

      // Realizar las solicitudes necesarias
      const [soporteResponse, imagenesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/soporte-tecnico/${id}`, config),
        axios
          .get(`${API_BASE_URL}/soporte-tecnico/${id}/latest-image`, config)
          .catch(() => ({ data: { imagenes: [] } })), // Manejo de errores para imágenes
      ]);

      // Procesar las respuestas
      if (soporteResponse.data) {
        setSoporte(soporteResponse.data);
        setUser(soporteResponse.data.User);

        // Manejo de imágenes de ingreso
        const imagenesIngresoModificadas = soporteResponse.data
          .ImageSoporteTecnicos
          ? soporteResponse.data.ImageSoporteTecnicos.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
              .slice(0, 10)
              .map((img) => ({
                ...img,
                url: img.url.startsWith("http")
                  ? img.url
                  : `${API_BASE_URL}${img.url}`,
              }))
          : [];
        setImagenesIngreso(imagenesIngresoModificadas);

        // Manejo de imágenes por estado
        const imagenes = imagenesResponse.data.imagenes
          ? imagenesResponse.data.imagenes
              .sort((a, b) => new Date(a.fechaSubida) - new Date(b.fechaSubida))
              .map((img) => ({
                ...img,
                url: img.url.startsWith("http")
                  ? img.url
                  : `${API_BASE_URL}${img.url}`,
              }))
          : [];

        const newEstadoImages = {
          Diagnosticando: [],
          Reparando: [],
          Reparado: [],
          Entregado: [],
        };

        const estadosConImagenes = [
          "Diagnosticando",
          "Reparando",
          "Reparado",
          "Entregado",
        ];

        imagenes.forEach((imagen, index) => {
          const estado =
            estadosConImagenes[Math.min(index, estadosConImagenes.length - 1)];
          if (estado) {
            newEstadoImages[estado].push(imagen);
          }
        });

        setEstadoImages(newEstadoImages);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false); // Finalizar el estado de carga, independientemente del resultado
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
      case "Diagnosticando":
        return "#ffc107";
      case "Pendiente":
        return "#dc3545";
      case "Reparando":
        return "#17a2b8";
      case "Reparado":
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
                Estado de la Orden
              </Badge>
            )}
          </div>
          <ProgressBar
            now={100}
            variant={getProgressBarVariant(index, currentStateIndex)}
            style={{ height: "10px", marginBottom: "1rem" }}
          />
          {estado === "Pendiente" ? (
            <Card.Text>
              <FaExclamationTriangle className="text-warning me-2" />
              Esperando confirmación del cliente
            </Card.Text>
          ) : (
            <>
              {estado === "Diagnosticando" && (
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
              {estado === "Reparado" && (
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

  if (!soporte || Object.keys(soporte).length === 0) {
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
    Ingreso: imagenesIngreso || [],
    Diagnosticando: estadoImages.Diagnosticando || [],
    Pendiente: [],
    Reparando: estadoImages["Reparando"] || [],
    Reparado: estadoImages["Reparado"] || [],
    Entregado: estadoImages.Entregado || [],
  };

  const estadoIndex = estados.indexOf(soporte.estado);
  const progreso = ((estadoIndex + 1) / estados.length) * 100;

  const generatePDF = (soporte) => {
    const doc = new jsPDF();

    // Configuración del documento
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const borderWidth = 2; // Grosor del marco negro

    // Dibujar el marco completo
    // Función para dibujar el marco negro en cada página
    const drawBlackBorder = () => {
      doc.setFillColor(0, 0, 0); // Color negro
      doc.rect(0, 0, pageWidth, borderWidth, "F");
      doc.rect(0, pageHeight - borderWidth, pageWidth, borderWidth, "F");
      doc.rect(0, 0, borderWidth, pageHeight, "F");
      doc.rect(pageWidth - borderWidth, 0, borderWidth, pageHeight, "F");
    };

    // Dibujar el marco en la primera página
    drawBlackBorder();

    const margin = borderWidth + 10; // Margen interior
    let currentY = margin; // Posición vertical inicial

    // Agregar el logo (centrado y achicado)
    const logoWidth = 60; // Ajusta el tamaño del logo
    const logoHeight = 30; // Ajusta el tamaño del logo
    doc.addImage(
      logo,
      "PNG",
      (pageWidth - logoWidth) / 2,
      currentY,
      logoWidth,
      logoHeight
    ); // Centrado horizontalmente
    currentY += logoHeight + 2; // Espaciado debajo del logo

    // Agregar el número de soporte técnico en mayúsculas y más grande
    const soporteNumero = `ORDEN DE SERVICIO #${soporte.id}`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16); // Fuente más grande que la de teléfono
    doc.setTextColor(0, 0, 0);
    const soporteWidth = doc.getTextWidth(soporteNumero);
    doc.text(soporteNumero, (pageWidth - soporteWidth) / 2, currentY);
    currentY += 2; // Espaciado debajo del número de soporte

    // Datos debajo del logo (centrados)
    const datosOrden = `
    Teléfonos: 3107043507 - 3173026445
    Cra 9 # 6 - 130, C.C Unicentro Local 210
    serviciotecnico@tiendamac.net
  `;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Ajustar la posición de cada línea de texto para centrarla
    const lineHeight = 7; // Altura de cada línea de texto
    const lines = datosOrden.split("\n");

    lines.forEach((line, index) => {
      const lineWidth = doc.getTextWidth(line);
      const x = (pageWidth - lineWidth) / 2; // Calcular la posición horizontal para centrar
      const y = currentY + lineHeight * index; // Calcular la posición vertical
      doc.text(line, x, y);
    });

    currentY += lineHeight * lines.length + 0; // Ajustar el espacio después de los datos de contacto

    // Sección: Datos Generales
    const datosGeneralesTitleHeight = 10;
    doc.setFillColor(0, 0, 0);
    doc.rect(
      borderWidth,
      currentY,
      pageWidth - 2 * borderWidth,
      datosGeneralesTitleHeight,
      "F"
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "DATOS GENERALES",
      pageWidth / 2,
      currentY + datosGeneralesTitleHeight / 2 + 2,
      {
        align: "center",
      }
    );
    currentY += datosGeneralesTitleHeight + 5; // Espaciado adicional después del título

    // Configuración general
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Ancho por columna
    const columnWidth = (pageWidth - 2 * borderWidth) / 4;
    const startX = borderWidth + 5;

    // Datos divididos en filas de 4 columnas según el nuevo orden
    const datos = [
      [
        `Fecha de Ingreso: ${
          soporte.createdAt
            ? new Date(soporte.createdAt).toLocaleDateString()
            : "No disponible"
        }`,
        `Estado: ${soporte.estado || "No disponible"}`,
      ],
      [
        `Fecha de Salida: ${
          soporte.fechaSalida
            ? new Date(soporte.fechaSalida).toLocaleDateString()
            : "No disponible"
        }`,
        `Nombre: ${user.firstName || "No disponible"} ${user.lastName || ""}`,
      ],
      [
        `Documento: ${user.documentNumber || "No disponible"}`,
        `Teléfono: ${user.phoneNumber || "No disponible"}`,
      ],
      [
        `Email: ${user.email || "No disponible"}`,
        `País: ${user.country || "No disponible"}`,
      ],
      [
        `Ciudad: ${user.city || "No disponible"}`,
        `Dirección: ${user.address || "No disponible"}`,
      ],
    ];

    // Iterar sobre las filas y columnas
    datos.forEach((fila) => {
      fila.forEach((texto, index) => {
        doc.text(texto, startX + index * columnWidth, currentY);
      });
      currentY += 7; // Espacio entre filas
    });

    // Sección: Datos del Equipo
    const equipoTitleHeight = 10;
    doc.setFillColor(0, 0, 0);
    doc.rect(
      borderWidth,
      currentY,
      pageWidth - 2 * borderWidth,
      equipoTitleHeight,
      "F"
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "DATOS DEL EQUIPO",
      pageWidth / 2,
      currentY + equipoTitleHeight / 2 + 2,
      {
        align: "center",
      }
    );
    currentY += equipoTitleHeight + 5; // Espaciado adicional después del título

    // Configuración general para los detalles del equipo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Ancho por columna

    // Detalles del equipo divididos en filas de 4 columnas
    const equipoDatos = [
      [
        `Marca: ${soporte.marca || "No disponible"}`,
        `Modelo: ${soporte.modelo || "No disponible"}`,
      ],
      [
        `Serial: ${soporte.serial || "No disponible"}`,
        `Contraseña: ${soporte.codigo || "No disponible"}`,
      ],
      [
        `Cámara: ${soporte.camara ? "Sí" : "No"}`,
        `Bluetooth: ${soporte.bluetooth ? "Sí" : "No"}`,
      ],
      [
        `Wifi: ${soporte.wifi ? "Sí" : "No"}`,
        `Teclado: ${soporte.teclado ? "Sí" : "No"}`,
      ],
      [
        `Parlantes: ${soporte.parlantes ? "Sí" : "No"}`,
        `Auricular: ${soporte.auricular ? "Sí" : "No"}`,
      ],
      [
        `Botones: ${soporte.botones ? "Sí" : "No"}`,
        `Pin de Carga: ${soporte.pinCarga ? "Sí" : "No"}`,
      ],
      [
        `Puertos: ${soporte.puertos ? "Sí" : "No"}`,
        `Pantalla: ${soporte.pantalla ? "Sí" : "No"}`,
      ],
      [
        `Garantía: ${soporte.garantia ? "Sí" : "No"}`,
        `Enciende: ${soporte.enciende ? "Sí" : "No"}`,
      ],
      [
        `Golpes: ${soporte.golpes ? "Sí" : "No"}`,
        `Rayones: ${soporte.rayones ? "Sí" : "No"}`,
      ],
      [
        `Diagnostico - Descripción: ${
          soporte.diagnosticoDescripcion || "No disponible"
        }`,
      ],
    ];

    // Iterar sobre las filas y columnas
    equipoDatos.forEach((fila) => {
      fila.forEach((texto, index) => {
        doc.text(texto, startX + index * columnWidth, currentY);
      });
      currentY += 7; // Espacio entre filas
    });

    currentY += 70; // Espaciado antes de la siguiente sección

    // Título: Condiciones de Servicio
    const titleBarHeight = 10;
    doc.setFillColor(0, 0, 0);
    doc.rect(
      borderWidth,
      currentY,
      pageWidth - 2 * borderWidth,
      titleBarHeight,
      "F"
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "CONDICIONES DE SERVICIO",
      pageWidth / 2,
      currentY + titleBarHeight / 2 + 2,
      {
        align: "center",
      }
    );
    currentY += titleBarHeight + 10;

    function addMultiLineText(
      doc,
      text,
      x,
      y,
      lineHeight,
      pageHeight,
      margin,
      isBold = false
    ) {
      // Cambiar a negrita si es necesario
      if (isBold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }

      const lines = doc.splitTextToSize(
        text,
        doc.internal.pageSize.getWidth() - 2 * margin
      );

      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          drawBlackBorder();
          y = margin; // Reiniciar la posición en la nueva página
        }
        doc.text(line, x, y);
        y += lineHeight;
      });
      return y; // Devolver la posición vertical actualizada
    }

    // Establecer color de texto (negro)
    doc.setTextColor(0, 0, 0); // Color negro

    // Títulos en negrita
    currentY = addMultiLineText(
      doc,
      "Duración del diagnóstico",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "La duración del diagnóstico técnico depende del tipo de servicio requerido por el cliente: 1. En caso de revisión, la duración máxima será de dos (2) a cuatro (4) días hábiles; en el evento de requerirse un mayor tiempo se le comunicará al cliente. 2. En caso de garantías, la duración máxima será de 30 días hábiles; en el evento de requerirse un mayor tiempo se le comunicará al cliente.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );

    currentY = addMultiLineText(
      doc,
      "Garantía de productos",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "En caso de solicitud de garantías, se sujetará a lo dispuesto por las condiciones de garantía de la marca del producto, las informadas y entregadas al cliente al momento de la compra. La garantía no podrá hacerse exigible si se comprueba que el equipo ha sido previamente abierto, que el producto tenga síntomas de humedad, que el producto presente síntomas de abuso o mal uso tales como golpes, fracturas de pantallas, entre otros.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Valor del diagnóstico",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "1. En caso de no aprobar reparación, el cliente se compromete a pagar el valor del diagnóstico técnico acordado en la orden de servicio. 2. Para las garantías aprobadas, el valor del diagnóstico será tenido en cuenta como valor de este. 3. Para las reparaciones, el valor del diagnóstico se incluirá dentro del valor total del servicio en caso de que el cliente decida tomarlo.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Garantía del servicio",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "Las reparaciones tienen una garantía máxima de tres (3) meses en cambios de piezas contados a partir de la fecha de entrega, por defectos de fábrica. El software instalado no tiene garantía.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Responsabilidades del cliente",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "Es responsabilidad del cliente informar previamente al técnico o responsable si el equipo tiene o no garantía, si se ha mojado o si ha sido abierto por terceros. Es responsabilidad del cliente la información registrada en esta orden de servicio, en caso de algún error el cliente debe informar previamente antes de firmar. En atención y cumplimiento al decreto 1413 del 3 de agosto de 2018, pasado un (1) mes a partir de la fecha prevista para la devolución o a la fecha en que el consumidor deba aceptar o rechazar expresamente el servicio, de conformidad con lo previsto en el numeral 1 anterior sin que el consumidor acuda a retirar el bien, el prestador del servicio lo requerirá para que lo retire dentro de los dos (2) meses siguientes a la remisión de la comunicación. Si el consumidor no lo retira se entenderá por ley que abandona el bien y el prestador del servicio deberá disponer del mismo conforme con la reglamentación que expida el Gobierno Nacional para el efecto. Pasado el tiempo en mención el cliente deberá cancelar un valor correspondiente a CINCO MIL PESOS M/CTE. ($5.000) por cada día de retraso, por concepto de bodegaje. En caso de que el producto / equipo sea recogido por un tercero, el cliente debe autorizar y notificar previamente por escrito.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Responsabilidades del prestador del servicio",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "TiendaMac, en calidad de proveedor de servicios, no se hace responsable de la información dejada en los equipos objeto de revisión, razón por la cual se recomienda al cliente extraer previamente la información. Asimismo, Tienda Mac, no se hace responsable por aquellos equipos en los que luego del diagnóstico técnico se evidencie que han sido abiertos y manipulados por terceros. En estos casos, se dejará constancia del hecho en la presente orden de servicio y se le informará al cliente. TiendaMac no se responsabiliza por el estado de los equipos dejados por más de un (1) mes. TiendaMac no se responsabiliza de accesorios diferentes al equipo, como lo son: Vidrios templados, case, stickers, entre otros.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Noticaciones",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "Las notificaciones de diagnósticos, reparaciones o novedades se efectuarán por las vías proporcionadas por el cliente, tales como teléfonos de contacto, correo electrónico o WhatsApp. En caso de no haber respuestas, igual será reportado como notificado. En cumplimiento a la Ley 1581 de 2012 y su decreto reglamentario 1377 de 2013, le informamos que Usted tiene derecho de conocer, actualizar, rectificar y solicitar la supresión de sus datos personales en cualquier momento. La información de sus datos aquí recopilada, en caso de que Usted lo autorice, la utilizaremos para informarle sobre los servicios, promociones, ofertas, eventos ofrecidos por TiendaMac o en convenio con otras organizaciones. Nos autoriza al tratamiento y uso de sus datos.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );
    currentY = addMultiLineText(
      doc,
      "Horarios de atención soporte técnico",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      true
    );
    currentY = addMultiLineText(
      doc,
      "Lunes a viernes en jornada de 10:00 AM - 7:00 PM. Sábados y festivos no laboramos.",
      margin,
      currentY,
      6,
      pageHeight,
      margin,
      false
    );

    // Espacio para la firma de "RECIBIDO" y "ENTREGADO"
    currentY += 15; // Añadimos un espacio después de la última sección

    // Firma de "RECIBIDO" (Cliente) - Alineado a la izquierda con espacio para firma debajo
    // Define un valor para el espacio entre el texto y la línea
    let lineSpacing = 20; // Ajusta este valor según el espacio que desees

    // Firma de acuerdo al estado
    if (soporte.estado === "Ingreso" || soporte.estado === "Otro") {
      // Firma de "RECIBIDO" por Funcionario de Soporte Técnico
      doc.setFont("helvetica", "bold");
      doc.text("RECIBIDO", 20, currentY); // Alineado a la izquierda
      doc.setFont("helvetica", "normal");
      doc.text("____________________", 20, currentY + lineSpacing); // Espacio para la firma
      doc.text(
        "Funcionario de Soporte Técnico",
        20,
        currentY + lineSpacing + 10
      ); // Etiqueta debajo

      // Firma de "ENTREGADO" por el Cliente
      doc.setFont("helvetica", "bold");
      doc.text("ENTREGADO", pageWidth - 100, currentY); // Alineado a la derecha
      doc.setFont("helvetica", "normal");
      doc.text("____________________", pageWidth - 100, currentY + lineSpacing); // Espacio para la firma
      doc.text("Cliente", pageWidth - 100, currentY + lineSpacing + 10); // Etiqueta debajo
    } else if (soporte.estado === "Entregado") {
      // Firma de "RECIBIDO" por el Cliente
      doc.setFont("helvetica", "bold");
      doc.text("RECIBIDO A SATISFACCIÓN", 20, currentY); // Alineado a la izquierda
      doc.setFont("helvetica", "normal");
      doc.text("____________________", 20, currentY + lineSpacing); // Espacio para la firma
      doc.text("Cliente", 20, currentY + lineSpacing + 10); // Etiqueta debajo

      // Firma de "ENTREGADO" por el Funcionario de Soporte Técnico
      doc.setFont("helvetica", "bold");
      doc.text("ENTREGADO", pageWidth - 100, currentY); // Alineado a la derecha
      doc.setFont("helvetica", "normal");
      doc.text("____________________", pageWidth - 100, currentY + lineSpacing); // Espacio para la firma
      doc.text(
        "Funcionario de Soporte Técnico",
        pageWidth - 100,
        currentY + lineSpacing + 10
      ); // Etiqueta debajo
    }

    // Guardar o mostrar el PDF
    doc.save("SoporteTecnico.pdf");
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">
        <FaMobileAlt className="me-2" />
        Soporte Técnico #{soporte.id}
      </h1>
      <div className="d-flex align-items-center">
        <Button
          variant="primary"
          className="mb-4 me-3"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Volver
        </Button>
        <Button
          variant="success"
          className="mb-4"
          onClick={() => generatePDF(soporte)}
        >
          <FaFilePdf className="me-2" />
          Generar PDF
        </Button>
      </div>
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
                <div>Estado de la Orden:</div>
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
                    <th>Contraseña</th>
                    <td>{soporte.codigo}</td>
                  </tr>
                  <tr>
                    <th>Estado de la Orden</th>
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
