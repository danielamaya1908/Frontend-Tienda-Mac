// Footer.js
import React, { useState } from 'react';
import styles from './Footer.module.css'; // Importa el archivo CSS con los estilos

const Footer = () => {
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

    const handleEmailClick = () => {
        setShowAdditionalInputs(!showAdditionalInputs);
    };

    return (
        <footer className={`text-white py-4 ${styles.bgDarkTransparent}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5 className="mb-3">Productos</h5>
                        <p><a href="#" className="text-white">Mac</a></p>
                        <p><a href="#" className="text-white">iPad</a></p>
                        <p><a href="#" className="text-white">iPhone</a></p>
                        <p><a href="#" className="text-white">Watch</a></p>
                        <p><a href="#" className="text-white">Música</a></p>
                        <p><a href="#" className="text-white">Apple TV</a></p>
                        <p><a href="#" className="text-white">Accesorios</a></p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="mb-3">Servicios</h5>
                        <p><a href="#" className="text-white">Financiamiento</a></p>
                        <p><a href="#" className="text-white">Sistecrédito</a></p>
                        <p><a href="#" className="text-white">iPhone for Life</a></p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="mb-3">Tienda Mac</h5>
                        <p><a href="#" className="text-white">¿Quienes somos?</a></p>
                        <p><a href="#" className="text-white">PQRS - Contacto</a></p>
                        <p><a href="#" className="text-white">Encuentra tu tienda</a></p>
                        <p><a href="#" className="text-white">Fe de Erratas</a></p>
                        <p><a href="#" className="text-white">Garantía Apple</a></p>
                        <p><a href="#" className="text-white">Beneficios</a></p>
                        <p><a href="#" className="text-white">Preguntas Frecuentes</a></p>
                        <p><a href="#" className="text-white">Términos y condiciones</a></p>
                        <p><a href="#" className="text-white">Política de privacidad</a></p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="mb-3">Información</h5>
                        <p><a href="#" className="text-white">Servicio Técnico</a></p>
                        <p><a href="#" className="text-white">Corporativo</a></p>
                        <p><a href="#" className="text-white">Mi cuenta</a></p>
                        <h5 className="mt-4 mb-3">Síguenos en:</h5>
                        <div className="d-flex">
                            <a href="https://web.facebook.com/tiendamacdecolombia/?locale=es_LA&_rdc=1&_rdr"><img src="src/img/icon-facebook.png" alt="Facebook" style={{width: '30px', marginRight: '10px'}} /></a>
                            <a href="https://www.instagram.com/tiendamac.co/"><img src="src/img/icon-instagram.png" alt="Instagram" style={{width: '30px', marginRight: '10px'}} /></a>
                            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fi%2Fflow%2Flogin"><img src="src/img/icon-twitter.png" alt="Twitter" style={{width: '30px', marginRight: '10px'}} /></a>
                            {/* <a href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20"><img src="src/img/icon-whatsApp.png" alt="WhatsApp" style={{width: '30px', marginRight: '10px'}} /></a> */}
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <h5 className="mb-2">ENTÉRATE PRIMERO DE NUESTRAS OFERTAS Y PRODUCTOS EXCLUSIVOS</h5>
                        <form>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Correo electrónico" onClick={handleEmailClick} />
                            </div>
                            {showAdditionalInputs && (
                                <>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Nombre" />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Celular" />
                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="terms" />
                                        <label className="form-check-label" htmlFor="terms">Acepto los términos y condiciones</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">SUSCRÍBETE</button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <p className="text-center">&copy; 2024 Tienda Mac. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
