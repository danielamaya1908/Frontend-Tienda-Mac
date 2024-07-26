import React from 'react';
import Navbar from '../NavBar/NavBar'; // Ajusta la ruta si es necesario
import Footer from '../Footer/Footer'; // Ajusta la ruta si es necesario
import './QuienesSomos.css'; // Asegúrate de incluir el archivo CSS para los estilos

const QuienesSomos = () => {
  return (
    <>
      <Navbar />
      <div className="quienes-somos-container">
        <div className="quienes-somos-content">
          <div className="quienes-somos-image">
            <img src="src/img/quienes_somo.jpg" alt="Quiénes Somos" /> {/* Reemplaza con la ruta de tu imagen */}
          </div>
          <div className="quienes-somos-info">
            <h1 className="fade-in">¿Quiénes somos?</h1>
            <p className="fade-in">
              Somos una empresa del sector IT, que ofrecemos los servicios y herramientas digitales a todos los sectores de la comunidad, acompañándoles de forma proactiva, segura y responsable en su transformación digital.
            </p>
            <p className="fade-in">
              Contamos con técnicos certificados y altamente capacitados por marcas líderes, con una amplia experiencia en la reparación y mantenimiento de toda clase de equipos.
            </p>
            <h2 className="fade-in">Misión</h2>
            <p className="fade-in">
              Crear comunidades digitales responsables y seguras, con el medio ambiente y la sociedad contribuyendo a cerrar cada día la brecha digital.
            </p>
            <h2 className="fade-in">Visión</h2>
            <p className="fade-in">
              Llegar a ser el proveedor No.1 en productos y servicios del sector IT por calidad y excelencia, logrando la satisfacción de nuestro equipo de trabajo, aliados estratégicos y a nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuienesSomos;
