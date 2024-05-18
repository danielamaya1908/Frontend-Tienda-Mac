import React from 'react';
import appleImage from '../../img/publicidad1.png';
import muñecoImage from '../../img/trabajando.png';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.appleImageContainer}>
        <img src={appleImage} alt="Apple" className={`img-fluid ${styles.customImg}`} />
        <div className={`${styles.contentOverlay} d-none d-md-block`}>
          <div className={`paragraphBackground ${styles.transparentBackground}`}>
            <h1 style={{ color: '#00009' }}>iPhone 15 Pro</h1>
            <h3 style={{ color: '#00000' }}>Titanio. Tan resistente y liviano. Tan Pro.</h3>
          </div>
        </div>
      </div>
      <div className={`text-center mt-5 mb-5 ${styles.workingImageSection}`}>
        <div className={styles.overlayBackground}></div>
        <div className={styles.workingImageOverlay}>
          <h6 style={{ color: '#FFFFFF' }}>
            En TiendaMac estamos trabajando para ofrecerte un mejor servicio.{' '}
            <a href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20" target="_blank" rel="noopener noreferrer">
              Contacta con nosotros en WhatsApp
            </a>
          </h6>
        </div>
        <img src={muñecoImage} alt="Muñeco trabajando" className={`img-fluid ${styles.workingImage}`} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;