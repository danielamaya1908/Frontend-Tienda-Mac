import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Nav, Dropdown } from 'react-bootstrap';
import { FaInfoCircle, FaShieldAlt, FaExchangeAlt, FaUndo, FaShoppingCart, FaQuestionCircle, FaTools, FaCreditCard } from 'react-icons/fa';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <>
      <Navbar />
      <Container className="terms-container mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="mb-4 text-center">
              <Image
                src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1721972268/TiendaMac/lbcvo6fkqshvqkh89bjy.webp"
                fluid
                className="terms-image w-100 animate__animated animate__fadeIn"
                alt="Términos y Condiciones"
              />
            </div>
            <Card className="terms-card animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <Nav variant="tabs" className="mb-3 justify-content-between">
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')}>
                      <FaInfoCircle /> Privacidad
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'dataTreatment'} onClick={() => setActiveTab('dataTreatment')}>
                      <FaShieldAlt /> Datos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'paymentMethods'} onClick={() => setActiveTab('paymentMethods')}>
                      <FaCreditCard /> Métodos de Pago
                    </Nav.Link>
                  </Nav.Item>
                  <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle as={Nav.Link}>
                      <FaExchangeAlt /> Garantías
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setActiveTab('warrantyPolicy')}>
                        Política de Garantías y de Cambios
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => window.location.href = 'https://www.apple.com/es/legal/warranty/'}>
                        Términos y Condiciones Garantía Apple
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setActiveTab('thirdPartyWarrantyTerms')}>
                        Términos y Condiciones Garantía Terceros
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link}>
                    <FaShoppingCart /> Ventas
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setActiveTab('salesTermsConditions')}>
                      Términos y Condiciones de Ventas Online
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setActiveTab('returnPolicy')}>
                    Términos y Condiciones de Retiro en Tienda
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'revisionPolicies'} onClick={() => setActiveTab('revisionPolicies')}>
                      <FaUndo /> Retracto
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'complaints'} onClick={() => setActiveTab('complaints')}>
                      <FaQuestionCircle /> Quejas
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link active={activeTab === 'technicalService'} onClick={() => setActiveTab('technicalService')}>
                      <FaTools /> Técnico
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                {activeTab === 'privacy' && (
                  <div>
                    <h5 className="text-center mb-4">Aviso de Privacidad</h5>
                    <p>Estimado Cliente,</p>
                    <p>
                      El Responsable del tratamiento de sus Datos Personales recolectados es Tienda Personal Computer SAS, con domicilio en la Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar, página web: <a href="http://www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a>, correo electrónico: <a href="mailto:info@tiendapc.com.co">info@tiendapc.com.co</a>, teléfono: 6055734688.
                    </p>
                    <p>
                      La finalidad de recolección de sus datos personales es mejorar el flujo de información entre Tienda Mac                     y sus clientes, para así estar en constante desarrollo de los bienes y servicios ofertados por nosotros.
                    </p>
                    <p>
                      Sus derechos como titular de la información recolectada son: CONOCER, ACTUALIZAR, RECTIFICAR Y EXCLUIR DICHA INFORMACIÓN DE NUESTRA BASE DE DATOS.
                    </p>
                    <p>
                      Para conocer sobre sus derechos, las herramientas que tiene para protegerlos y de los compromisos que Tienda Mac                     tiene con usted, lo invitamos a revisar las Políticas de Tratamiento de la Información dispuestas en nuestra página web <a href="http://www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a> en la pestaña Políticas de Privacidad. De no tener acceso a la Página Web, también podrá solicitar una copia física de estas políticas en cualquiera de nuestras tiendas.
                    </p>
                  </div>
                )}

{activeTab === 'dataTreatment' && (
  <div>
    <h5 className="text-center mb-4">Políticas de Tratamiento de Datos Personales</h5>
    <p>
      En Tienda-Mac Colombia estamos comprometidos con brindarte la mejor experiencia de Servicio. Para ello requerimos captar algunos de tus datos personales, lo cual nos permitirá mantenerte actualizado sobre los productos que comercializamos, la llegada de nuevos productos y nuestras promociones. Además, nos ayudará a identificar tus intereses y necesidades para buscar la manera de satisfacerlos. El manejo de tus datos personales se realizará siguiendo los lineamientos de la Ley Estatutaria 1581 de 2012 y el Decreto Reglamentario 1377 de 2013, a partir de los cuales hemos elaborado las presentes Políticas de Tratamiento y Protección de Datos Personales, en adelante Políticas:
    </p>

    <h5>Políticas de Tratamiento de Datos Personales</h5>
    <p>
      Tus datos personales serán recolectados a través de:
    </p>
    <ul>
      <li>Inscripción a nuestra página Web.</li>
      <li>Al realizar compras en línea (no conservaremos tus datos financieros).</li>
      <li>Cuando solicitas la inscripción en nuestras tiendas.</li>
      <li>Cuando realizas compras de productos o servicios en nuestras tiendas.</li>
    </ul>
    <p>
      Captaremos tus datos personales para ofrecerte un mejor servicio, remitirte información que pueda ser de tu interés y que te mantenga actualizado sobre los productos y servicios que ofrecemos y cruzar en listas vinculantes para Colombia, listas públicas internacionales y locales sobre personas investigadas por lavado de activos o financiación del terrorismo, en cualquier momento. Tienda Mac                     se reserva el derecho de contratar los servicios de un tercero para la realización del cruce en listas. Si realizas compras en línea, nos garantizará realizar la entrega de manera adecuada y expedir la factura correspondiente.
    </p>

    <h5>Responsable del Tratamiento de Tus Datos Personales</h5>
    <p>
      El Responsable del Tratamiento de tus datos personales es Tienda Personal Computer S.A.S, (en adelante el Responsable), sociedad domiciliada en la ciudad de Bogotá, que podrás contactarla a través de los siguientes medios:
    </p>
    <ul>
      <li>Dirección física: Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar </li>
      <li>Correo electrónico: <a href="mailto:info@tiendamac.net">info@tiendamac.net</a></li>
      <li>A través del contáctanos de nuestra página Web: <a href="www.tiendamac.net/" target="_blank" rel="noopener noreferrer">www.tiendamac.net/</a></li>
    </ul>

    <h5>Encargado del Tratamiento de Tus Datos Personales</h5>
    <p>
      El área que realizará el tratamiento de tus datos personales será el Área de Mercadeo deTienda-Mac Colombia, en adelante, el Encargado, quien velará, bajo la supervisión del Responsable, por el pleno ejercicio de los derechos de los titulares de los datos personales. El Encargado podrá ser contactado por los siguientes medios:
    </p>
    <ul>
      <li>Dirección física: Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar</li>
      <li>Correo electrónico: <a href="mailto:info@tiendamac.net">info@tiendamac.net</a></li>
    </ul>

    <h5>Menores de Edad</h5>
    <p>
      Tienda Personal Computer S.A.S no captará datos personales de niños, adolescentes o menores de edad. Por ello, si eres menor de edad y quieres hacer parte de nuestra base de datos, solicita a un mayor de edad que te represente y, a través de esta persona, te haremos llegar información sobre nuestros productos, promociones y noticias.
    </p>

    <h5>Derechos de los Titulares de Datos Personales</h5>
    <p>
      Tienda Personal Computer S.A.S siempre requerirá autorización expresa por parte de sus clientes para captar sus datos personales, la cual conservaremos para tu verificación cuando lo consideres necesario. Tus derechos como titular de tus datos personales son:
    </p>
    <ul>
      <li>Derecho a solicitar prueba de tu autorización para la captación de tus datos personales.</li>
      <li>Derecho a conocer tus datos personales que hemos captado por cualquier medio.</li>
      <li>Derecho a actualizar tus datos personales en todo momento.</li>
      <li>Derecho a rectificar tus datos personales que se encuentren inexactos, incompletos o fraccionados.</li>
      <li>Derecho a excluir tus datos personales de nuestras bases de datos.</li>
      <li>Derecho a revocar la autorización del uso de tus datos personales, a menos que persista un deber legal o contractual de permanecer en la base de datos de Tienda-Mac.</li>
      <li>Derecho a conocer el uso de tus datos personales y si se realiza alguna modificación sobre el mismo.</li>
    </ul>

    <h5>Consultas</h5>
    <p>
      Podrás presentar consultas o reclamos tanto al Responsable como al Encargado en todo momento para el ejercicio de tus derechos, a través de los medios de contacto expuestos anteriormente, adjuntando una copia de tu documento de identidad. Si la consulta la realizas a través de un tercero, deberá acreditar que le has autorizado para hacerla.
    </p>
    <p>
      Las consultas deberán ser resueltas por el Responsable o por el Encargado en un término máximo de 10 días hábiles, desde la fecha de recepción de la consulta. Si por la naturaleza de la consulta no se puede resolver en ese término, el Responsable o el Encargado te informará los motivos de demora y señalará la fecha en la que resolverá la consulta, la cual no podrá ser superior a 5 días hábiles, siguientes al vencimiento del primer término.
    </p>

    <h5>Reclamos</h5>
    <p>
      Si consideras que se ha realizado un incumplimiento al tratamiento de tus datos personales, podrás presentar un reclamo, el cual como mínimo debe contener:
    </p>
    <ul>
      <li>Identificación del titular de los datos personales, copia de su documento.</li>
      <li>Hechos que dieron lugar a la reclamación.</li>
      <li>Datos de contacto de quien radica el reclamo.</li>
      <li>En caso de querer aportar documentos que sustenten su reclamo, podrán ser aportados.</li>
    </ul>
    <p>
      El Responsable o el Encargado podrá solicitar, dentro de los 5 días calendario siguientes a la recepción del reclamo, que se complemente. Si el solicitante no lo realiza en un periodo de 2 meses, se entenderá que el reclamo ha sido abandonado.
    </p>
    <p>
      Una vez el reclamo esté completo, el Responsable o el Encargado realizará una inscripción en su base de datos que diga “reclamo en trámite” y tendrá un periodo de 15 días hábiles para resolverlo, desde la fecha inicial de recepción del reclamo o desde la segunda fecha de recepción, si se requirieron complementos.
    </p>

    <h5>Seguridad de la Información</h5>
    <p>
      Tienda-Mac está comprometida con el correcto tratamiento de los datos personales de los titulares, evitando el acceso no autorizado de terceros que permitan conocer o vulnerar la información que reposa en nuestras bases de datos. Por tal motivo, Tienda-Mac cuenta con protocolos de seguridad y acceso a sus sistemas de información, almacenamiento y procesamiento, incluyendo medidas físicas y tecnológicas de seguridad para tal fin. En el caso de realizar compras en línea, no conservaremos tu información financiera; este tipo de transacción se realiza a través de una plataforma especialmente diseñada para ello.
    </p>

    <h5>Limitación de la Aplicación de las Políticas</h5>
    <p>
      Estas políticas tendrán aplicación para el tratamiento de datos entregados a Tienda-Mac a través de los canales mencionados. Si bien la página Web de Tienda-Mac tiene conexión a los perfiles de Tienda-Mac en las redes sociales Facebook, Twitter e Instagram, la información que los usuarios provean a través de estas redes será tratada y administrada acorde a los términos y condiciones de estas páginas.
    </p>

    <h5>Vigencia</h5>
    <p>
      Éstas políticas comienzan a regir a partir del día 01 de Julio 2024, y estarán vigentes durante la existencia de Tienda Personal Computer S.A.S La vigencia de la base de datos será hasta que la finalidad que justifica su tratamiento persista.
    </p>
  </div>
)}

                {activeTab === 'paymentMethods' && (
                  <div>
                    <h5 className="text-center mb-4">Métodos de Pago</h5>
                    <p>
                      Los métodos de pago disponibles en el sitio web de Tienda Mac                     son:
                    </p>
                    <ul>
                      <li>Pagos en línea (tarjeta de crédito o débito, PSE, pagos en efectivo en tiendas aliadas) mediante la pasarela de pagos Openpay.</li>
                    </ul>
                    <p>
                      Desde nuestro Ecommerce no capturamos, almacenamos ni transmitimos datos transaccionales. Para esto contamos con los servicios de Openpay, que es una plataforma de pagos certificada, que garantiza la seguridad de todas las transacciones por medio de software de encriptación, procedimientos de validación y medidas robustas de protección de datos a nivel bancario (certificación PCI nivel 1). Por eso realizar los pagos en nuestro sitio web es seguro.
                    </p>
                    <p>
                      Si su pago es con PSE, la pasarela de pagos Openpay se encarga de comunicarlo directamente con su banco a través de ACH. Al pagar a través de este canal, está utilizando los procesos de seguridad de su propio banco, quien es el que valida su clave principal y segunda clave si es el caso.
                    </p>
                  </div>
                )}
                {activeTab === 'warrantyPolicy' && (
                  <div>
                    <h5 className="text-center mb-4"><strong>Política de Garantías y de Cambios</strong></h5>

                    <p>
                      Garantías y cambios de productos comprados en línea. Sólo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras deberá comunicarse con nuestra tienda Tienda-Mac  más cercana.
                    </p>

                    <h5><strong>Garantía</strong></h5>
                    <p>
                      Los productos comercializados por Tienda-Mac  de la marca Apple® tienen una garantía vigente por un periodo de un (1) año contados a partir de la fecha de venta del producto. Los demás artículos y/o productos que no son de la marca Apple® podrán tener un término de garantía diferente, de acuerdo con lo establecido al momento de la compra, y según consta en el Resumen de Compra y Factura de Venta, previa a la aprobación de compra en línea.
                    </p>

                    <h5><strong>Datos de contacto servicio técnico ventas por internet</strong></h5>
                    <p>
                      Correo electrónico: <a href="mailto:info@tiendamac.net">info@tiendamac.net</a>
                    </p>
                    <p>
                      Si su producto fue entregado en una ciudad donde Tienda-Mac  tiene tiendas abiertas, usted deberá llevar el producto a la tienda Tienda-Mac  de esa ciudad para hacer efectiva la garantía. Debe tener la factura al momento de la comunicación para reportar información que se encuentra dentro de la misma, como el número de la factura y la fecha de expedición.
                    </p>

                    <h5><strong>Respuesta de la garantía</strong></h5>
                    <p>
                      Tienda-Mac  remitirá a sus clientes una respuesta oficial acerca de la solicitud de ejercer su garantía, la cual podrá ser en dos sentidos:
                    </p>
                    <ul>
                      <li>No procedencia de la garantía por encontrarse fuera del término de la misma. En este caso, le remitiremos los datos de nuestro Servicio Técnico para que el cliente pueda comunicarse con ellos y dar una solución efectiva a sus necesidades.</li><br/>
                      <li>Procedencia de la garantía. Se le remitirá al cliente los pasos a seguir para la revisión del producto y solución de los inconvenientes que se le presenten, en particular los datos de la compañía de correos para coordinar la entrega del producto, instrucciones que el cliente deberá seguir de forma estricta para la validez de la garantía. Todos los gastos de envío del producto para hacer efectiva la garantía correrán por cuenta de Tienda-Mac .</li><br/>
                      <p>Alcance de la garantía y exigibilidad de la garantía</p>
                    </ul>

                    
                    <h5><strong>
                      La garantía presentada por Tienda-Mac  comprende lo siguiente:
                      </strong>
                    </h5>
                    <ul>
                      <li>La prestación gratuita de los servicios de reparación durante el periodo de vigencia de la garantía.</li><br/>
                      <li>La disponibilidad de piezas de recambio respecto de aquellas que se consideren de alta rotación.</li><br/>
                      <li>En caso de no ser posible la reparación o repetirse la falla, la garantía comprende el cambio del bien por uno igual o similar, o la devolución del dinero pagado por el producto.</li><br/>
                    </ul>
                    <p>En el evento de que el cliente haga exigible la garantía bajo la modalidad de cambio de producto o devolución del dinero, por considerarse que existe una falla reiterada, el cliente deberá presentar la correspondiente Petición, Queja y Reclamo (PQR) por escrito, siguiendo nuestras políticas PQR. De esta solicitud se le dará respuesta al cliente dentro de los quince [15] días hábiles siguientes, en sentido negativo o positivo.</p><br/>
                    <p>
                      En el evento de no estar satisfecho con la respuesta dada a su PQR, usted podrá iniciar las acciones legales para que la controversia sea decidida por el Juez correspondiente, pudiendo acudir a la Superintendencia de Industria y Comercio, Delegatura de Protección al Consumidor.
                    </p>
                  </div>
                )}

                {activeTab === 'thirdPartyWarrantyTerms' && (
                  <div>
                    <h5 className="text-center mb-4">Términos y Condiciones Garantía Terceros</h5>
                    <p>
                      En Tienda Mac                     nos preocupamos por la calidad y respaldo de nuestros productos, por ello aquí podrás encontrar los términos de garantía:
                    </p>
                    <p>
                      Para efectos de cambio y garantía recomendamos presentar los accesorios completos y en perfecto estado, producto en empaque original.
                    </p>
                    <p>
                    Tienda Personal Computer SAS  se rige por políticas de garantía establecidas por los productores de los bienes que ésta comercializa y las leyes aplicables.
                    </p>
                    <p>
                      Para productos APPLE por favor remitirse a la página web www.apple.com/legal/warranty/es
                    </p>
                    <ul>
                      <li>Cases, Speakers, y productos Essentials: 1 año de garantía.</li>
                      <li>Screen Protectors ó protectores de pantalla: 3 meses de garantía.</li>
                    </ul>
                    <h5>Proceso</h5>
                    <p>
                      Si el cliente tiene la posibilidad de acercarse a nuestras tiendas físicas, llevará el producto y un asesor atenderá el requerimiento de garantía.
                    </p>
                    <p>
                      Si el cliente no tiene la posibilidad de acercarse a nuestras tiendas físicas, deberá contactarse por el correo electrónico servicioalcliente@Tienda-Mac .com enviando la solicitud de validación de garantía, incluyendo datos de compra y con la información de la novedad presentada a fin de coordinar la atención del requerimiento.
                    </p>
                  </div>
                )}
                {activeTab === 'salesTermsConditions' && (
                <div>
                  <h5 className="text-center mb-4">Términos y Condiciones de Ventas Online</h5>
                  <p>Sólo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras, deberá comunicarse con nuestra tienda Tienda-Mac más cercana.</p>
                  <p>Las compras realizadas a través de nuestro portal <a href="www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a> se regirán por los siguientes Términos y Condiciones. Los clientes a lo largo de su proceso de compra, reconocen haber leído, entendido y aceptado estos Términos y Condiciones.</p>
                  <h6>Identidad de los Contratantes</h6>
                  <p>Tienda Personal Computer  S.A.S. (en adelanteTienda Mac), es una sociedad legalmente constituida bajo las leyes colombianas, identificada con el NIT. 901176890-2, con domicilio principal en Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar</p>
                  <p>De otra parte, el Usuario/Cliente (en adelante Cliente) quien realiza un proceso de registro en nuestro portal <a href="www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a> de manera libre e informada. En el proceso de registro, los Datos Personales que el Cliente suministre serán tratados bajo las Políticas de Tratamiento de Datos Personales.</p>
                  <h6>Información de Nuestros Productos</h6>
                  <p>Los productos ofertados en nuestro portal <a href="www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a> estarán acompañados de una descripción detallada de cada uno de los productos, junto con imágenes de los mismos, que le permitan al consumidor tomar una decisión informada de la compra, la cual el cliente acepta y reconoce haber leído previo a la realización de la compra.</p>
                  <p>Si dentro de la descripción del producto el Cliente desea ampliar la información, podrá comunicarse con nuestra área de Servicio al Cliente a través de los siguientes correos electrónicos: info@tiendapc.com.co</p>
                  <p>Si el producto que has adquirido no es lo que el Cliente esperaba, podrá ejercer su Derecho de Retracto, siguiendo las Políticas de Reversión de Pago y Derecho de Retracto.</p>
                  <h6>Portafolio de Productos</h6>
                  <p>En el Portal indicaremos la disponibilidad de cada uno de nuestros productos, pero las cantidades disponibles se modificarán constantemente, y la adquisición estará sujeta a la disponibilidad del producto.</p>
                  <p>En caso de que el Cliente realice su compra y el producto no se encuentre disponible, se le notificará tan pronto como sea posible y se realizará una devolución del dinero dentro de los siguientes 30 días calendario a la fecha de la compra.</p>
                  <h6>Resumen de Pedido</h6>
                  <p>Previamente a la finalización de la compra mediante el pago, el Cliente visualizará un resumen del pedido de todos los bienes que pretende adquirir, con los elementos necesarios para su identificación; el precio individual de cada uno de ellos, y el precio total de los bienes y servicios, así como los costos adicionales que se deban pagar por envío, y cualquier otro concepto, así como la sumatoria total a pagar, así como la dirección de envío de su pedido.</p>
                  <p>El Cliente tiene el deber de verificar que la operación refleje su intención de compra, y demás condiciones, así como la dirección de destino. En el evento de encontrar alguna inconsistencia el Cliente puede hacer las correcciones o declinar la venta.</p>
                  <p>Hecha la verificación podrá confirmar la compra, la cual se entiende que es expresa, conocida, voluntaria, cuando Usted acepta el resumen de compra, que direcciona al pago.</p>
                  <p>Si el cliente detecta algún error en los datos remitidos, deberá informarlo de inmediato a Tienda-Mac, para realizar la corrección de los mismos a través de cualquiera de los siguientes correos electrónicos: info@Tienda-Mac.com</p>
                  <h6>Validaciones Adicionales Ventas e-Commerce</h6>
                  <p>Tienda-Mac Colombia, para el caso de las ventas de carácter no presencial, es autónomo de definir las políticas de venta y los procesos de validación y confirmación de la identidad de su cliente, previos, simultáneos o posteriores a la operación, dirigidos a mitigar su riesgo transaccional. En casos excepcionales cuando Tienda-Mac requiera realizar una validación adicional de las ventas no presenciales, podrá solicitarle al cliente otros documentos que certifiquen la transacción y que el Tarjetahabiente que realizó la compra se presente de manera presencial en cualquiera de nuestras Tiendas Físicas de Tienda-Mac en Colombia para validar la identidad del cliente. Una vez Tienda-Mac realice la validación junto con su pasarela de pago, podrá aceptar la transacción o proceder a la reversión de la misma.</p>
                  <h6>Pago</h6>
                  <p>El pago se realizará a través de cualquier de los medios dispuestos en la página. Usted recibirá dentro de las 24 horas siguientes a la compra un acuse de recibo de su orden de compra, con información sobre los productos adquiridos, disponibilidad del producto, tiempo de entrega, precio total pagado, y la forma en que se realizó el pago.</p>
                  <p>Una vez efectuado el pago, el Cliente podrá solicitar la Reversión del Pago o ejercer el Derecho de Retracto de acuerdo con nuestras Políticas de Reversión del Pago y Derecho de Retracto.</p>
                  <h6>Soporte de Pago</h6>
                  <p>Una copia de la factura emitida por la compra será enviada al correo electrónico dispuesto en al momento de la compra por el cliente, y la original le será remitida junto con el producto.</p>
                  <h6>Envío y Entrega de los Productos</h6>
                  <p>Tienda-Mac tiene cobertura en las principales ciudades de Colombia.</p>
                  <p>El producto será entregado en la dirección suministrada por el Cliente y deberá ser recibido por el Cliente, debiendo para tal efecto mostrar su identificación.</p>
                  <p>La entrega de los productos nunca superará 30 días calendario, máximo legal establecido por el Estatuto del Consumidor, a menos que de forma previa a dicho término Tienda-Mac haya acordado un término superior con el Cliente.</p>
                  <p>Una vez el Cliente reciba el producto, deberá verificar que éste se encuentra en perfectas condiciones exteriores, respecto de su presentación exterior. En caso de no ser posible su verificación sin apertura del embalaje original, deberá realizar la apertura del producto frente a la persona encargada de entregarlo y hacer la verificación correspondiente.</p>
                  <p>De encontrarse alguna anomalía, el encargado de la entrega levantará un acta resumiendo la anomalía detectada, pactará con el Cliente si desea la recepción de un nuevo producto idéntico o la reversión del pago.</p>
                  <p>Desde Tienda-Mac hacemos nuestro mejor esfuerzo para que el pedido llegue en el menor tiempo posible, siendo el plazo máximo de entrega 30 días*, salvo que se indique lo contrario en la información detallada del producto. Recuerda que los tiempos de entrega se encuentran fuera del control de Tienda-Mac y dependen del destino, la empresa transportadora y las condiciones específicas del transporte.</p>
                  <p>*Los tiempos de entrega estándar ofrecidos por Tienda-Mac para periodos no promocionales es de 6 a 10 días hábiles</p>
                  <p>*En caso que la entrega del pedido supere los 30 días, el cliente podrá obtener la devolución de las sumas pagadas sin ningún costo por su parte. La devolución del dinero se realizará en un plazo máximo de 30 días.</p>
                  <h6>Envíos a San Andrés Islas</h6>
                  <p>Los envíos realizados a San Andrés Islas/Providencia, tienen una validación adicional por parte del equipo de Tienda-Mac, una vez el cliente realice el pedido deberá esperar el llamado de confirmación por parte del área de Servicio al Cliente de la Tienda Online. El valor del envío tendrá una variación de acuerdo al producto, tamaño y peso. Es muy importante que el cliente verifique los datos suministrados al momento de la compra para que el contacto sea efectuado correctamente.</p>
                  <h6>Recoger en Tienda</h6>
                  <p>El tiempo máximo de permanencia de un producto en la tienda será de 10 días calendario. Superado este tiempo, el pedido será cancelado y la compra reembolsada.</p>
                  <h6>Legislación Aplicable a las Compras Realizadas a través del Portal de Tienda-Mac</h6>
                  <p>Tiempos de entrega Tienda-Mac nivel nacional - ciudades principales: 2 a 7 días hábiles</p>
                  <p>Tiempos de entrega Tienda-Mac nivel nacional - resto del país: 3 a 9 días hábiles</p>
                  <p>Tiempos de entrega Tienda-Mac Valledupar de 2 a 4 días hábiles</p>
                  <p>Para cualquier inquietud podrá comunicarse con nuestra área de Servicio al Cliente a través de los siguientes correos electrónicos: info@tiendapc.com.co</p>
                  <p>En caso de requerir la atención de alguna reclamación o consulta, podrás también contactarte a través del medio siguiente:</p>
                  <ul>
                    <li>Dirección:Carrera 9 # 6 - 130 Local 210, Valledupar - Cesar, Colombia.</li>
                    <li>Correo electrónico: info@tiendapc.com.co</li>
                  </ul>
                  <h6>Política de Protección de Datos Personales</h6>
                  <p>La información que el Cliente proporcione será utilizada por Tienda-Mac, exclusivamente para los fines de venta online y el procesamiento de su pedido.</p>
                  <p>Tienda-Mac garantiza la protección y confidencialidad de los datos personales de los clientes, de acuerdo con la Ley 1581 de 2012 de Protección de Datos Personales en Colombia.</p>
                </div>
              )}
              {activeTab === 'returnPolicy' && (
                <div>
                  <h5 className="text-center mb-4">Términos y Condiciones de Retiro en Tienda</h5>
                  <p>Tienda-Mac Colombia, dispondrá en la página web/tienda online el listado de las tiendas físicas habilitadas para que nuestros clientes puedan recoger los productos que adquirieron a través de las compras o transacciones realizadas por medio de la tienda online.</p>
                  
                  <h6>1. Retiro de los productos</h6>
                  <p>En el proceso de compra recibirás dos correos. Un primer correo donde se notifica la compra exitosa, que corrobora el pago aprobado y validado por parte de Tienda-Mac (Correo - Compra exitosa).</p>
                  <p>Posteriormente, y pasadas cuatro (4) horas del correo anterior, se enviará un segundo correo electrónico, en el que se te informará que el pedido se encuentra listo para retirar, confirmando el lugar de entrega (Correo – Listo para retirar).</p>
                  <p>Las siguientes tiendas no aplican en la promesa de (4) horas, la promesa es de 2 a 5 días hábiles:</p>
                  <p>Las compras de lunes a viernes después de las 7:00 PM y sábados después de las 12M y que estén confirmadas mediante Correo – Compra Exitosa, sólo estarán disponibles para retiro el siguiente día hábil, a pesar de que llegue el Correo - Listo para retirar.</p>
                  <p>Para estas tiendas el horario es de lunes a viernes después de las 7:00 PM. No aplica sábados:</p>
                  <h6>2. Plazo para retiro de los productos</h6>
                  <p>Si pasados quince (15) días calendario desde la fecha del Correo - Listo para retirar, el cliente no ha retirado el pedido en la tienda seleccionada, Tienda-Mac procederá a generar un bono a favor del cliente, bajo las siguientes condiciones:</p>
                  <ul>
                    <li>Bono nominativo. Se expedirá a nombre del cliente e intransferible, mediante envío de código alfanumérico al correo electrónico.</li>
                    <li>Se deberá redimir en la compra de producto en la tienda online de Tienda-Mac: <a href="www.tiendamac.net" target="_blank" rel="noopener noreferrer">www.tiendamac.net</a></li>
                    <li>El bono se deberá redimir dentro del año siguiente a la fecha de compra.</li>
                    <li>Tendrá por fecha de expedición el día de la compra del producto.</li>
                    <li>No se podrá pedir su redención en dinero.</li>
                  </ul>

                  <h6>3. Condiciones de disponibilidad del producto</h6>
                  <p>Cuando realices la compra de varios artículos en nuestra tienda en línea, verifica que cada uno esté disponible en la tienda física donde planeas recoger tu pedido. De no ser así, al intentar pagar, el sistema no te permitirá concluir la compra con la opción de retiro en tienda, quedando habilitada únicamente la opción de envío a domicilio.</p>
                  <p>Para validar la disponibilidad de un producto para retiro en tienda, puedes hacerlo en la Página de Detalle del Producto (PDP), donde encontrarás la sección 'Compra Online y retira en tienda'; allí debes seleccionar 'Ver disponibilidad en tienda'. Luego, se mostrará una lista de las tiendas que tienen el producto disponible para retiro.</p>
                  <p>En ocasiones, varios clientes pueden estar adquiriendo productos simultáneamente en nuestra tienda online. Esto podría resultar en la falta de disponibilidad de algún artículo al momento de efectuar la compra o durante la preparación del pedido. En tal caso, Tienda-Mac Colombia se compromete a contactar a los afectados por correo electrónico, SMS, WhatsApp o llamada telefónica. Se informará sobre la indisponibilidad del producto dentro de los cinco (5) días hábiles siguientes y se procederá a reembolsar el monto total pagado o a crear un saldo a favor, según lo prefiera el cliente.</p>

                  <h6>4. Ofertas y promociones de tiendas Online</h6>
                  <p>Las promociones, descuentos o estrategias de venta vigentes en la tienda online, pueden variar respecto a las condiciones y ofertas vigentes en las ventas de la tienda física. Para estos efectos, las ventas mediante la modalidad de compra online y retiro en tienda, se estiman como ventas online.</p>

                  <h6>5. Validación antifraude</h6>
                  <p>Si la compra del cliente ingresa a nuestro sistema de validación antifraude, esto puede retrasar el envío del correo - Listo para retirar hasta por 6 días hábiles. En este evento, se solicitarán comprobantes adicionales para validar la veracidad de la compra. En los casos de verificación antifraude, se podrán hacer las siguientes validaciones:</p>
                  <ul>
                    <li>Soporte de la APP del banco donde se refleje el débito de la compra realizada en Tienda-Mac (este soporte debe ser una certificación emitida por el banco acreditando el movimiento; si es tarjeta de crédito, debe contener el código de autorización).</li>
                    <li>Captura del movimiento, solo se tendrá en cuenta el soporte que sea de la APP o sucursal virtual).</li>
                    <li>Documento de identidad del titular (ambos lados en archivo PDF).</li>
                    <li>No solicitaremos el número de la tarjeta con que se realizó la compra. Abstenerse de enviar imágenes de la tarjeta.</li>
                    <li>Los documentos solicitados serán tratados únicamente para efectos de una verificación de seguridad atribuida a la compra realizada por usted en el portal web de Tienda-Mac Colombia.</li>
                  </ul>
                  <p>Para mayor información ingresa a los Términos y condiciones de venta online publicados en <a href="https://www.tiendamac.net/terms-and-conditions" target="_blank" rel="noopener noreferrer">https://www.tiendamac.net/terms-and-conditions</a>.</p>

                  <h6>6. Condiciones para la entrega del pedido en tienda física</h6>
                  <ul>
                    <li>El pedido solo se podrá reclamar de manera personal durante el tiempo establecido para ello.</li>
                    <li>Al momento del retiro y entrega del producto, el cliente (titular de la compra o pedido) deberá presentar el número del pedido que el sistema le asignó y su documento de identidad original.</li>
                    <li>No se permite ningún tipo de modificación de retiro luego del envío del Correo - Compra exitosa. En tal sentido, no se aceptan cambios de dirección de envío, tiempos de entrega del pedido, cambio en la tienda para retiro o modificaciones en los productos comprados.</li>
                    <li>No hay devoluciones de dinero. Solo son posibles cambios por productos de igual o mayor valor, previo al retiro del producto de la tienda.</li>
                    <li>Para las garantías y ejercicio del derecho de retracto revisa los Términos y Condiciones dispuestos en nuestra página web: <a href="https://www.tiendamac.net/terms-and-conditions" target="_blank" rel="noopener noreferrer">https://www.tiendamac.net/terms-and-conditions</a>.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'revisionPolicies' && (
                <div>
                  <h5 className="text-center mb-4"><strong>Políticas de reversión de pago y derecho de retracto</strong></h5>
                  <p>
                    Solo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras, deberá comunicarse con nuestra tienda Tienda-Mac más cercana.
                  </p>
                  <h5>Reversión de Pago</h5>
                  <h6>Plazo de Solicitud</h6>
                  <p>
                    El término máximo para ejercer el derecho de retracto es de cinco (5) días hábiles contados a partir de la entrega del bien. El Cliente podrá pedir la reversión del pago en las siguientes circunstancias:
                  </p>
                  <ul>
                    <li>La compra realizada fue producto de una operación fraudulenta.</li>
                    <li>La operación no fue solicitada.</li>
                    <li>La entrega del producto excedió el máximo legal establecido.</li>
                    <li>El producto no corresponde a lo solicitado por el Cliente.</li>
                  </ul>
                  <h6>Procedimiento</h6>
                  <p>
                    En el momento que el Cliente detecte alguna de las circunstancias mencionadas, deberá notificarlo a Tienda Mac a través del siguiente medio:
                  </p>
                  <ul>
                    <li>Correo electrónico: info@tiendapc.com.co</li>
                  </ul>
                  <p>
                    Dentro de los dos días hábiles siguientes al envío de su correo, Tienda Mac le dará una respuesta sobre la documentación y datos necesarios para iniciar el procedimiento de reversión del pago. Durante este periodo, el Cliente también deberá notificar a su entidad Bancaria para proceder con la reversión de la transacción.
                  </p>
                  <h6>Respuesta de la Solicitud</h6>
                  <p>
                    Si la solicitud de reversión de pago es procedente, la devolución del dinero se realizará dentro de los 25 a 30 días hábiles siguientes a la fecha en que se presentó la solicitud, siempre y cuando el producto adquirido esté en poder de Tienda Mac y haya sido devuelto en perfectas condiciones. Si Tienda Mac considera que la solicitud no es procedente, no realizará el reintegro del dinero y comunicará al cliente las razones.
                  </p>
                  <h6>Condiciones de Devolución de los Equipos y Artículos</h6>
                  <p>
                    Al presentar su solicitud de devolución, el Cliente recibirá instrucciones sobre los medios y condiciones de la devolución, que serán enviadas por correo electrónico, incluyendo los datos del transportador encargado. No se aceptará la devolución de equipos o artículos usados o manipulados en condiciones más allá de las necesarias para verificar su estado de entrega.
                  </p>
                  <h6>Resolución de Controversias</h6>
                  <p>
                    Las controversias surgidas por el ejercicio del derecho de reversión del pago serán resueltas ante la Justicia Ordinaria, aplicando la normatividad Colombiana vigente al momento de la compra.
                  </p>
                  <h5>Derecho de Retracto</h5>
                  <h6>Plazo para Ejercerlo</h6>
                  <p>
                    El derecho de retracto puede ser ejercido dentro de los cinco (5) días hábiles siguientes a la fecha de entrega del bien o aceptación del servicio. Si el retracto es comunicado el mismo día de la compra dentro del horario laboral, Tienda Mac procederá con la devolución del dinero en un plazo de 4 a 7 días hábiles.
                  </p>
                  <h6>Trámite de la Solicitud</h6>
                  <p>
                    El Cliente deberá comunicarse por los siguientes medios dentro del plazo estipulado: info@Tienda-Mac.com. Tienda Mac enviará al Cliente los lineamientos para la devolución del producto, incluyendo datos del transportador.
                  </p>
                  <h6>Devolución del Producto</h6>
                  <p>
                    El Cliente deberá cubrir los gastos de devolución del producto bajo los lineamientos de Tienda Mac. El producto deberá ser devuelto en perfecto estado, con empaques y etiquetas originales, sin señales de uso.
                  </p>
                  <h6>Reintegro del Dinero</h6>
                  <p>
                    Una vez recibido el producto en las instalaciones de Tienda Mac, se iniciará el proceso de reintegro del dinero, que se realizará dentro del término legal establecido (25 a 30 días hábiles), siempre que el producto cumpla con las condiciones para su devolución. Si el retracto es comunicado el mismo día de la compra, la devolución se realizará en 6 a 10 días hábiles.
                  </p>
                  <h6>Reversión de Pago SARLAFT</h6>
                  <p>
                    Tienda Mac podrá realizar la reversión de la operación en caso de tener conocimiento de la inclusión del Cliente en listados relacionados con lavado de activos o financiación del terrorismo.
                  </p>
                </div>
              )}
            {activeTab === 'complaints' && (
              <div>
                <h5 className="text-center mb-4"><strong>Peticiones, Quejas y Reclamos</strong></h5>
                <p>
                  Solo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras, deberá comunicarse con nuestra tienda Tienda-Mac más cercana.
                </p>
                <p>
                  Ingrese aquí para diligenciar su Petición, Queja o Reclamo (en adelante PQR) que versen sobre: (i) la calidad o idoneidad del producto; (ii) sobre el procedimiento de compra y la entrega; (iii) sobre el servicio al cliente prestado por Tienda Mac; (iv) sobre el manejo de sus datos personales.
                </p>
                <p>
                  Una vez recibida su solicitud, se estudiará con el objetivo de ofrecerle la respuesta más apropiada de acuerdo a la naturaleza de su requerimiento.
                </p>
                <p>
                  Recuerde que Tienda Mac cuenta con un periodo de 15 días hábiles para generar su contestación, ya sea PQR en materia de condiciones de calidad e idoneidad de nuestros productos o servicios, o respecto del tratamiento de sus datos.
                </p>
                <p>
                  En caso de no obtener respuesta durante el término referido, o no siendo satisfactoria la respuesta obtenida, usted podrá acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co), o a las instancias legales que estime pertinentes.
                </p>
              </div>
            )}
               {activeTab === 'technicalService' && (
                <div>
                  <h5 className="text-center mb-4"><strong>Términos y Condiciones del Servicio Técnico Tienda Mac</strong></h5>
                  <p>
                    El cliente acepta el servicio técnico bajo los siguientes términos y condiciones, los cuales afirma haber leído y aceptado al momento del ingreso a nuestro servicio:
                  </p>
                  <ol>
                    <li>
                      La revisión del equipo en el laboratorio se dirigirá a diagnosticar las fallas señaladas por el cliente.
                    </li>
                    <li>
                      En la revisión del equipo se podrán encontrar daños accidentales externos y/o internos no detectados o declarados por el cliente al momento del ingreso al proceso de servicio.
                    </li>
                    <li>
                      Debido a la naturaleza de algunas fallas o intervenciones que se hagan al equipo, la información contenida en el equipo pudiera no ser recuperable, por lo que el cliente debe hacer una copia de toda su información de forma previa a la entrega del equipo.
                    </li>
                    <li>
                      El equipo se entregará en la fecha estimada indicada en la Orden de Trabajo. Para los casos fuera de garantía, esta fecha se puede ver modificada ya que el inicio de la reparación está sujeto al abono realizado por el cliente según previa cotización. En caso de presentarse situaciones ajenas a Tienda Mac, como causas logísticas, riesgos catastróficos (terremoto, temblor, maremoto, marejada, tsunami, huelga, asonada, motín, incendio, conmoción civil o popular, etc.), se podría notificar un cambio de fecha de entrega.
                    </li>
                    <li>
                      Los costos de diagnóstico para el servicio fuera de garantía son para equipos Mac: $60.000 pesos y para equipos iOS: $40.000 pesos. El costo del diagnóstico no se cobrará en caso de aceptar la cotización de la reparación. Los costos de reparación podrían aumentar respecto de la cotización original, de acuerdo con la revisión efectuada en el laboratorio, y deberán ser aprobados de forma previa por el cliente antes de cualquier intervención.
                    </li>
                    <li>
                      La información personal solicitada (nombre, dirección, número de teléfono y dirección de correo electrónico) es necesaria para proceder con la solicitud del servicio. Si el servicio se solicita a raíz de una obligación de servicio de un tercero, esta información se transferirá al tercero para que compruebe su calidad y confirme la transacción del servicio, y envíe una encuesta al cliente. Al firmar abajo, el cliente da consentimiento para que un tercero transfiera y use la información para este fin.
                    </li>
                    <li>
                      Las piezas de repuesto o productos son iguales o equivalentes a los reemplazados en rendimiento y fiabilidad. Estas unidades de servicio serán entregadas sin accesorios y sin caja, a diferencia de los equipos comprados en el piso de ventas.
                    </li>
                    <li>
                      Para reparaciones fuera de garantía se pueden usar partes nuevas o remanufacturadas, lo cual el cliente acepta expresamente al momento de dejar su equipo.
                    </li>
                    <li>
                      Todos los equipos y partes reemplazados en cumplimiento de la garantía original del producto tienen un término de garantía de un (1) año. Las piezas o partes compradas por separado o instaladas como parte de un proceso de reparación por fuera de garantía tienen tres (3) meses de garantía, término que se aplicará al servicio mismo.
                    </li>
                    <li>
                      Pasado un (1) mes de la notificación de la fecha prevista de entrega o de aceptación del servicio sin que el equipo sea retirado o se haya decidido aceptar o rechazar el servicio, se enviará un segundo aviso de notificación para retiro del equipo. Luego del segundo aviso, pasados dos (2) meses, el cliente declara en abandono el producto, permitiendo a Tienda Mac disponer del mismo, lo cual acepta expresamente con la aceptación de la presente orden de servicio.
                    </li>
                    <li>
                      Respecto al Servicio de Domicilio: el cliente es responsable del empaque y embalaje entregado al operador logístico y, por consiguiente, del estado en el que se reciba en el centro de servicios. Se recomienda comprar el seguro del producto de acuerdo a los precios de su elección indicados durante la llamada. El servicio de domicilios debe ser pagado durante la llamada y no existirá opción de desistimiento para un reembolso.
                    </li>
                  </ol>
                  <p>
                    Términos de Garantía Limitada Apple en: <a href="https://www.apple.com/legal/warranty/es/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/warranty/es/</a>
                  </p>
                </div>
              )}
             </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
