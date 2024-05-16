import React from 'react';
import appleImage from '../../img/publicidad1.png'; 
import muñecoImage from '../../img/trabajando.png'; // Ruta de la imagen del muñeco
import styles from './Home.module.css'; 
import Footer from '../Footer/Footer'; 

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <img src={appleImage} alt="Apple" className={`img-fluid ${styles.customImg}`} />
            <div className="content text-center position-absolute top-100 start-50 translate-middle">
                <div className={`paragraphBackground ${styles.transparentBackground}`}>
                    <h1 style={{ color: '#00009' }}>iPhone 15 Pro</h1>
                    <h3 style={{ color: '#00000' }}>Titanio. Tan resistente y liviano. Tan Pro.</h3>   
                </div>
            </div>
            <div className={`text-center mt-5 mb-5 ${styles.workingImageSection}`} style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '1' }}></div>
    <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '10px', borderRadius: '5px', zIndex: '2' }}>
        <h6 style={{ color: '#FFFFFF' }}>
            En TiendaMac estamos trabajando para ofrecerte un mejor servicio.
            <a href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20" target="_blank" rel="noopener noreferrer">
                Contacta con nosotros en WhatsApp
            </a>
        </h6>
    </div>
    <img src={muñecoImage} alt="Muñeco trabajando" className="img-fluid" style={{ width: '52%', height: 'auto', maxHeight: '500px' }} />
</div>

            <Footer /> 
        </div>
    );
};

export default Home;
