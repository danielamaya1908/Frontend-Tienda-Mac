import React from "react";
import styles from "./Home.module.css";
import Footer from "../Footer/Footer";
import Slideshow from "./Slideshows/Slideshow";
import SubNavbar from "../SubNavbar/SubNavbar";
import IphoneAndProSection from "./SectionsProducts/IphoneAndProSection";
import FeaturedProductsSection from "./SectionsProducts/FeaturedProductsSection";
import AccessoriesSection from "./SectionsProducts/AccessoriesSection";
import soporteTecnico from "./Slideshows/img/Servicio_Tecnico.webp";

const Home = () => {
  const supportWhatsappUrl =
    "https://api.whatsapp.com/send?phone=573173026445&text=Hola,%20quisiera%20obtener%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20soporte%20t%C3%A9cnico.%20Tengo%20un%20equipo%20que%20necesita%20revisi%C3%B3n%20y%20me%20gustar%C3%ADa%20conocer%20los%20detalles%20del%20proceso,%20costos,%20y%20tiempos%20de%20reparaci%C3%B3n.%20Agradezco%20su%20respuesta.";

  return (
    <div className={styles.homeContainer}>
      <Slideshow />
      <div className="container-fluid py-5">
        <section className="mb-5">
          <IphoneAndProSection />
        </section>

        <section className="mb-5">
          <SubNavbar />
          <FeaturedProductsSection />
        </section>

        <section className="mb-5">
          {" "}
          <AccessoriesSection />
        </section>

        <section className="mb-5">
          <div
            className="container"
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
          >
            <a
              href={supportWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
              }}
            >
              <img
                src={soporteTecnico}
                alt="Soporte Técnico"
                className="imgHover" /* Aplica la clase de animación */
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
