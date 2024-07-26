import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css';
import './Ubicacion.css'; // Asegúrate de tener este archivo con los estilos personalizados

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Ubicacion = () => {
  // Coordenadas para las dos ubicaciones
  const positionValledupar = [10.4880795, -73.2617534];
  const positionCartagena = [10.4036454, -75.555832];

  // Estado para controlar la selección de la tienda preferida
  const [selectedStore, setSelectedStore] = useState(null);

  // Cargar la tienda preferida del localStorage al montar el componente
  useEffect(() => {
    const preferredStore = localStorage.getItem('preferredStore');
    if (preferredStore) {
      setSelectedStore(preferredStore);
    }
  }, []);

  // Manejar la selección de la tienda preferida
  const handleSelectStore = (store) => {
    localStorage.setItem('preferredStore', store);
    setSelectedStore(store);
  };

  return (
    <>
      <Navbar />
      <div className="ubicacion-container mt-5 mb-5 animate__animated animate__fadeIn">
        <div className="text-center mb-4">
          <h1 className="display-3 font-weight-bold text-dark">Ubicaciones</h1>
        </div>
        <div className="ubicacion-content">
          <div className="map-info">
            <div className="info">
              <h3>Tienda Mac Valledupar</h3>
              <p>Valledupar, Cesar</p>
              <p>
                <a
                  href="https://www.google.com/maps/place/TiendaMac/@10.4880795,-73.2617534,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Carrera 9 # 6 - 130 Local 210, Valledupar, Cesar
                </a>
              </p>
              {selectedStore !== 'Valledupar' && (
                <button
                  className="btn-preferida"
                  onClick={() => handleSelectStore('Valledupar')}
                >
                  Haz de esta mi tienda preferida
                </button>
              )}
              {selectedStore === 'Valledupar' && (
                <div className="notification">Tienda Valledupar seleccionada</div>
              )}
            </div>
            <div className="map-container">
              <MapContainer center={positionValledupar} zoom={15} style={{ height: '250px', width: '700px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={positionValledupar}>
                  <Popup>
                    Sede Valledupar<br />
                    Carrera 9 # 6 - 130 Local 210, Valledupar, Cesar
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div className="map-info">
            <div className="info">
              <h3>Tienda Mac Cartagena</h3>
              <p>Cartagena, Bolívar</p>
              <p>
                <a
                  href="https://www.google.com/maps/place/TiendaMac/@10.4036454,-75.555832,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cra. 3 #8 - 128 Local 3, Cartagena de Indias, Provincia de Cartagena, Bolívar
                </a>
              </p>
              {selectedStore !== 'Cartagena' && (
                <button
                  className="btn-preferida"
                  onClick={() => handleSelectStore('Cartagena')}
                >
                  Haz de esta mi tienda preferida
                </button>
              )}
              {selectedStore === 'Cartagena' && (
                <div className="notification">Tienda Cartagena seleccionada</div>
              )}
            </div>
            <div className="map-container">
              <MapContainer center={positionCartagena} zoom={15} style={{ height: '250px', width: '700px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={positionCartagena}>
                  <Popup>
                    Sede Cartagena<br />
                    Cra. 3 #8 - 128 Local 3, Cartagena de Indias, Provincia de Cartagena, Bolívar
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ubicacion;
