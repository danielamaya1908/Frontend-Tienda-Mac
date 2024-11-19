import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SoporteTecnico.css";
import MenuDashboard from "../MenuDashboard/MenuDashboard";
import { FaPlus, FaSyncAlt, FaUpload } from "react-icons/fa"; // Icons for add, update, and upload

const SoporteTecnico = () => {
  const navigate = useNavigate();
  const [ordenesServicio, setOrdenesServicio] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos los Estados");
  const [imagenes, setImagenes] = useState({}); // State to handle uploaded images
  const [diagnosticoDescripcion, setDiagnosticoDescripcion] = useState({});

  useEffect(() => {
    const fetchOrdenesServicio = async () => {
      try {
        const response = await axios.get(
          "https://backend-tienda-mac-production.up.railway.app/soporte-Tecnico"
        );
        setOrdenesServicio(response.data);
        // Initialize diagnosticoDescripcion state with values from the response
        const initialDiagnosticos = {};
        response.data.forEach((orden) => {
          initialDiagnosticos[orden.id] = orden.diagnosticoDescripcion || "";
        });
        setDiagnosticoDescripcion(initialDiagnosticos);
      } catch (error) {
        console.error("Error al obtener órdenes de servicio:", error);
      }
    };

    fetchOrdenesServicio();
  }, []);

  const filteredOrdenes = ordenesServicio.filter((orden) => {
    const matchesSearch =
      orden.id.toString().includes(searchTerm) ||
      (orden.User &&
        (orden.User.firstName + " " + orden.User.lastName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      orden.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "Todos los Estados" ||
      orden.estado.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleAgregarEquipo = () => {
    navigate("/FormEquipo");
  };

  const handleVerDetalles = (id) => {
    navigate(`/soporteTecnico/${id}`);
  };

  const handleEstadoChange = async (id, newEstado) => {
    try {
      let diagnostico = diagnosticoDescripcion[id] || "";

      if (newEstado === "EnDiagnostico") {
        diagnostico = prompt(
          "Por favor, ingrese la descripción del diagnóstico:",
          diagnostico
        );
        if (diagnostico === null) return; // User cancelled the prompt
      }

      let data = {
        estado: newEstado,
        diagnosticoDescripcion: diagnostico,
      };

      const response = await axios.put(
        `https://backend-tienda-mac-production.up.railway.app/soporte-tecnico/${id}/estado`,
        data
      );

      setOrdenesServicio(
        ordenesServicio.map((orden) =>
          orden.id === id
            ? {
                ...orden,
                estado: newEstado,
                fechaSalida: response.data.fechaSalida,
                diagnosticoDescripcion: diagnostico,
              }
            : orden
        )
      );

      setDiagnosticoDescripcion((prev) => ({ ...prev, [id]: diagnostico }));

      // Ask to update the image when the state changes
      if (imagenes[id]) {
        alert("Por favor, actualice la imagen para este estado.");
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const handleImagenChange = (id, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenes((prevState) => ({
        ...prevState,
        [id]: {
          file,
          preview: reader.result,
        },
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubirImagen = async (id) => {
    const formData = new FormData();
    formData.append("imagen", imagenes[id].file);

    try {
      await axios.post(
        `https://backend-tienda-mac-production.up.railway.app/soporte-tecnico/${id}/subir-imagen`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Imagen subida con éxito");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    }
  };
  const getStatusDescription = (status) => {
    switch (status) {
      case "Ingreso":
        return "El próximo estado será En diagnóstico. Puede demorar de 1 a 3 días para cambiar a ese estado.";
      case "En diagnostico":
        return "El próximo estado será En espera de aprobación cliente. Puede demorar de 1 a 3 días hábiles para su revisión y cambiar de estado.";
      case "En espera de aprobacion cliente":
        return "Esperando confirmación del cliente.";
      case "En reparacion":
        return "El equipo está siendo reparado.";
      case "Listo para entregar":
        return "El equipo está listo para ser recogido por el cliente.";
      case "Entregado":
        return "El equipo fue entregado al cliente con éxito.";
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <MenuDashboard />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="soporte-tecnico">
            <h1 className="text-center fw-bold">Orden de Servicio</h1>
            <div className="controls">
              <input
                type="text"
                placeholder="Buscar orden por #soporte, marca, modelo o serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Todos los Estados">Todos los Estados</option>
                <option value="Ingreso">Ingreso</option>
                <option value="EnEsperaDeAprobacionCliente">
                  En espera de aprobación cliente
                </option>{" "}
                <option value="EnDiagnostico">En diagnóstico</option>{" "}
                <option value="EnReparacion">En reparación</option>{" "}
                <option value="ListoParaEntregar">Listo para entregar</option>{" "}
                <option value="Entregado">Entregado</option>
              </select>
              <button onClick={handleAgregarEquipo} className="btn-agregar">
                Agregar Nuevo Equipo
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Estado</th>
                  <th>Cliente</th>
                  <th>Id Cliente</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Serial</th>
                  <th>Ingreso</th>
                  <th>Entrega</th>
                  {/* <th>Diagnóstico</th> */}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdenes.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>
                      <div className="estado-container">
                        <select
                          value={orden.estado}
                          onChange={(e) =>
                            handleEstadoChange(orden.id, e.target.value)
                          }
                          className={`estado ${orden.estado
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          <option value="Ingreso">Ingreso</option>
                          <option value="En diagnostico">En diagnóstico</option>
                          <option value="En espera de aprobacion cliente">
                            En espera de aprobación cliente
                          </option>
                          <option value="En reparacion">En reparación</option>
                          <option value="Listo para entregar">
                            Listo para entregar
                          </option>
                          <option value="Entregado">Entregado</option>
                        </select>
                        <p className="status-description">
                          {getStatusDescription(orden.estado)}
                        </p>

                        <div className="image-actions">
                          {imagenes[orden.id] && imagenes[orden.id].preview ? (
                            <>
                              <div className="image-preview">
                                <img
                                  src={imagenes[orden.id].preview}
                                  alt="Previsualización"
                                  style={{
                                    maxHeight: "100px",
                                    maxWidth: "100px",
                                  }}
                                />
                              </div>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById(`file-input-${orden.id}`)
                                    .click()
                                }
                                className="btn-update"
                              >
                                <FaSyncAlt /> Actualizar Imagen
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                document
                                  .getElementById(`file-input-${orden.id}`)
                                  .click()
                              }
                              className="btn-add"
                            >
                              <FaPlus /> Agregar Imagen
                            </button>
                          )}
                          <input
                            type="file"
                            id={`file-input-${orden.id}`}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) =>
                              handleImagenChange(orden.id, e.target.files[0])
                            }
                          />
                        </div>

                        {imagenes[orden.id] && imagenes[orden.id].file && (
                          <button
                            onClick={() => handleSubirImagen(orden.id)}
                            className="btn-upload"
                          >
                            <FaUpload /> Subir Imagen
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      {orden.User
                        ? `${orden.User.firstName} ${orden.User.lastName}`
                        : "Información no disponible"}
                    </td>
                    <td>{orden.userId}</td>
                    <td>{orden.modelo}</td>
                    <td>{orden.marca || "Información no disponible"}</td>
                    <td>{orden.serial || "Información no disponible"}</td>
                    <td>
                      {orden.fechaIngreso
                        ? new Date(orden.fechaIngreso).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {orden.fechaSalida
                        ? new Date(orden.fechaSalida).toLocaleDateString()
                        : "-"}
                    </td>
                    {/* <td>{diagnosticoDescripcion[orden.id] || '-'}</td> */}
                    <td>
                      <button
                        onClick={() => handleVerDetalles(orden.id)}
                        className="btn-ver"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span className="page-number">1</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SoporteTecnico;
