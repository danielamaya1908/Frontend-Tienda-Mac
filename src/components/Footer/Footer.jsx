import React, { useState } from 'react';
import styles from './Footer.module.css'; // Importa el archivo CSS con los estilos

const Footer = () => {
    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

    const handleEmailClick = () => {
        setShowAdditionalInputs(!showAdditionalInputs);
    };

    return (
        <footer className={`text-black py-4 ${styles.bgDarkTransparent}`}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                        <h5 className="mb-3">Productos</h5>
                        <p><a href="macAll" className="text-black">Macs</a></p>
                        <p><a href="ipadAll" className="text-black">iPads</a></p>
                        <p><a href="iphoneAll" className="text-black">iPhones</a></p>
                        <p><a href="AppleWatchAll" className="text-black">Watchs</a></p>
                        <p><a href="airpods" className="text-black">Airpods</a></p>
                        <p><a href="AppleTVyHogar" className="text-black">Apple TV & Hogar</a></p>
                        <p><a href="SonidoAll" className="text-black">Sonidos</a></p>
                        <p><a href="AccesoriosAll" className="text-black">Accesorios</a></p>
                    </div>
                    <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                        <h5 className="mb-3">Servicios</h5>
                        <p><a href="#" className="text-black">Financiamiento</a></p>
                        <p><a href="#" className="text-black">Sistecrédito</a></p>
                        {/* <p><a href="#" className="text-black">iPhone for Life</a></p> */}
                    </div>
                    <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                        <h5 className="mb-3">Tienda Mac</h5>
                        <p><a href="/QuienesSomos" className="text-black">¿Quienes somos?</a></p>
                        <p><a href="/PQRS" className="text-black">PQRS - Contacto</a></p>
                        <p><a href="/Ubicacion" className="text-black">Encuentra tu tienda</a></p>
                        <p><a href="warranty" className="text-black">Garantía Apple</a></p>
                        {/*  <p><a href="#" className="text-black">Beneficios</a></p> */}
                        <p><a href="faq" className="text-black">Preguntas Frecuentes</a></p>
                        <p><a href="/terms-and-conditions" className="text-black">Términos y condiciones</a></p>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <h5 className="mb-3">Información</h5>
                        <p><a href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20Necesito%20información%20sobre%20servicio%20técnico%20para%20mi%20dispositivo%20Apple.%20¿Podrían%20ayudarme%3F%20Gracias!" className="text-black" target="_blank" rel="noopener noreferrer">Servicio Técnico</a></p>
                        {/* <p><a href="#" className="text-black">Corporativo</a></p> */}
                        <p><a href="/detalles-cuenta" className="text-black">Mi cuenta</a></p>
                        <h5 className="mt-4 mb-3">Síguenos en:</h5>
                        <div className="d-flex flex-wrap">
                            <a href="https://web.facebook.com/tiendamacdecolombia/?locale=es_LA&_rdc=1&_rdr">
                                <img src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1717265046/TiendaMac/kjnl34vrdvcs6gpscoja.png" alt="Facebook" style={{ width: '30px', marginRight: '10px' }} />
                            </a>
                            <a href="https://www.instagram.com/tiendamac.co/">
                                <img src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1717265046/TiendaMac/kminotyxqfmmlltrexbd.png" alt="Instagram" style={{ width: '30px', marginRight: '10px' }} />
                            </a>
                            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fi%2Fflow%2Flogin">
                                <img src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1717265046/TiendaMac/nvgipm06kfzgoma0ejdh.png" alt="Twitter" style={{ width: '30px', marginRight: '10px' }} />
                            </a>
                            {/* <a href="https://api.whatsapp.com/send?phone=573173026445&text=%C2%A1Hola%20Tienda%20Mac!%20"><img src="src/img/icon-whatsApp.png" alt="WhatsApp" style={{width: '30px', marginRight: '10px'}} /></a> */}
                        </div>
                    </div>
                </div>
                {/*  <div className="row mt-4">
                    <div className="col-md-4 mb-4 mb-md-0">
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
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="terms" />
                                        <label className="form-check-label" htmlFor="terms">Acepto los términos y condiciones</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">SUSCRÍBETE</button>
                                </>
                            )}
                        </form>
                    </div>
                </div> */}
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