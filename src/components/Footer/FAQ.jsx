import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from '../NavBar/NavBar';
import Footer from './Footer';
import 'animate.css';
import './FAQ.css';

const FAQ = () => {
  const [openSection, setOpenSection] = useState({});
  const [openQuestion, setOpenQuestion] = useState({});

  const handleSectionToggle = (section) => {
    setOpenSection(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleQuestionToggle = (question) => {
    setOpenQuestion(prevState => ({
      ...prevState,
      [question]: !prevState[question]
    }));
  };

  return (
    <>
      <Navbar />
      <Container className="faq-container mt-2 mb-2">
        <Row className="justify-content-center">
          <Col md={12} lg={10} xl={8}>
            <div className="mb-4 text-center">
              <Image 
                src="https://res.cloudinary.com/dn6k2fnhj/image/upload/v1721972269/TiendaMac/fg60x4xcewxhusurvswq.jpg" 
                fluid 
                className="faq-image w-100 border rounded shadow-sm animate__animated animate__fadeIn" 
                alt="Preguntas Frecuentes" 
              />
            </div>
            <Card className="faq-card shadow-lg border-0 animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <Card.Title className="text-center mb-4 display-3 font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-2s">
                  Preguntas Frecuentes
                </Card.Title>
                <Card.Text className="text-justify">
                  
                  {/* Sección: ¿Cómo comprar? */}
                  <div className="faq-section">
                    <h4 
                      className="font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-3s faq-section-title" 
                      onClick={() => handleSectionToggle('howToBuy')}
                      aria-controls="howToBuyContent" 
                      aria-expanded={openSection['howToBuy']}
                    >
                      ¿Cómo comprar?
                      {openSection['howToBuy'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </h4>
                    <Collapse in={openSection['howToBuy']}>
                      <div id="howToBuyContent">
                        <div className="faq-question" onClick={() => handleQuestionToggle('register')}>
                          <h5 className="font-weight-bold">
                            ¿Cómo registrarme?
                            {openQuestion['register'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['register']}>
                          <div>
                            <p>Es muy sencillo registrarte. Solo realiza los siguientes pasos:</p>
                            <ul>
                              <li>Ir al botón "Mi cuenta"</li>
                              <li>Dar clic en "Registrar"</li>
                              <li>Llena tus datos personales</li>
                              <li>Finalmente, ingresa tu usuario y contraseña así podrás recibir información sobre eventos, productos y promociones.</li>
                            </ul>
                            <p>Para comprar no es necesario registrarse. Podrás comprar solo con tu correo electrónico.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('chooseProduct')}>
                          <h5 className="font-weight-bold">
                            ¿Cómo elijo el producto que quiero?
                            {openQuestion['chooseProduct'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['chooseProduct']}>
                          <div>
                            <p>Navega por nuestra página web y encontrarás una barra superior con las categorías de productos principales.</p>
                            <p>Podrás dar clic en la categoría que prefieras y encontrarás todos los productos que tenemos para ti.</p>
                            <p>Elije el producto de tu interés y haz clic. Cada producto cuenta con una descripción general o ficha técnica para tu información.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('useCart')}>
                          <h5 className="font-weight-bold">
                            ¿Cómo utilizar el Carrito de Compras?
                            {openQuestion['useCart'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['useCart']}>
                          <div>
                            <p>Selecciona el producto de tu interés.</p>
                            <p>En caso de ser necesario, elije color y capacidad que prefieres.</p>
                            <p>Deberás dar clic en “agregar al carrito”.</p>
                            <p>Finalmente, tendrás el resumen de orden dónde visualizarás todos tus productos para la compra.</p>
                            <p>Elige la opción de pago que prefieras. Puedes comprar con Tarjeta de crédito, PSE, Efecty, Baloto, Su Red o Pago referenciado con Banco de Davivienda, Bancolombia o Banco Bogotá.</p>
                            <p>Una vez realizada tu compra recibirás un correo automático con la confirmación.</p>
                          </div>
                        </Collapse>
                      </div>
                    </Collapse>
                  </div>
                    {/* Sección: Pagos y Transacciones */}
                    <div className="faq-section mt-1">
                    <h4 
                      className="font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-3s faq-section-title" 
                      onClick={() => handleSectionToggle('payments')}
                      aria-controls="paymentsContent" 
                      aria-expanded={openSection['payments']}
                    >
                      Pagos y Transacciones
                      {openSection['payments'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </h4>
                    <Collapse in={openSection['payments']}>
                      <div id="paymentsContent">
                        <div className="faq-question" onClick={() => handleQuestionToggle('paymentMethods')}>
                          <h5 className="font-weight-bold">
                            ¿Qué medios de pago puedo utilizar para realizar la compra?
                            {openQuestion['paymentMethods'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['paymentMethods']}>
                          <div>
                            <p>Puedes elegir entre una serie de opciones de pago que te ofrecemos:</p>
                            <ul>
                              <li>MasterCard</li>
                              <li>VISA</li>
                              <li>American Express</li>
                              <li>Diners</li>
                              <li>PSE (cuenta de ahorros o cuenta corriente)</li>
                              <li>Baloto</li>
                              <li>Efecty</li>
                              <li>Su Red</li>
                              <li>Pago Referenciado con Banco de Davivienda, Bancolombia o Banco de Bogotá.</li>
                            </ul>
                            <p>Todos los titulares de tarjetas de crédito y débito son objeto de validación y autorización tanto por el emisor de la tarjeta como por nuestra parte a fin de mantener la seguridad y evitar posibles fraudes. De ser necesario nos contactaremos con la persona que ha realizado la compra para hacer validaciones adicionales.</p>
                            <p>Ten en cuenta que para pedidos realizados mediante Efecty, Baloto, Pago referenciado con Bancolombia, Davivienda o Banco de Bogotá, tienes un tiempo límite de 24 horas para realizar tu pago.</p>
                            <p>Te llegará un boleto con la información del día y hora en el que caduca dicho plazo; si no lo cumples, la orden será cancelada automáticamente y tendrás que realizar una nueva compra. No olvides que el pago máximo aceptado es de 1.000.000 para Baloto y 3.000.000 para Efecty.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('internationalPayments')}>
                          <h5 className="font-weight-bold">
                            ¿Puedo hacer pagos desde el exterior?
                            {openQuestion['internationalPayments'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['internationalPayments']}>
                          <div>
                            <p>Podrás realizar pagos desde el exterior siempre y cuando tengas tarjetas de crédito o débito emitidas por una entidad bancaria en Colombia. Solo hacemos entregas de pedidos en el territorio nacional Colombiano.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('paymentAnyTime')}>
                          <h5 className="font-weight-bold">
                            ¿Puedo realizar el pago cualquier día y a cualquier hora?
                            {openQuestion['paymentAnyTime'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['paymentAnyTime']}>
                          <div>
                            <p>Sí, en nuestra tienda Online podrás realizar tus compras en línea los 7 días de la semana, las 24 horas del día a sólo un clic de distancia.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('transactionIssues')}>
                          <h5 className="font-weight-bold">
                            ¿Qué debo hacer si mi transacción no concluyó?
                            {openQuestion['transactionIssues'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['transactionIssues']}>
                          <div>
                            <p>En primera instancia deberás revisar si llegó un mail de confirmación del pago en tu cuenta de correo electrónico (la inscrita en el momento de realizar el pago), en caso de no haberlo recibido, deberás contactar al área de atención al Cliente a través del formulario de la sección CONTÁCTANOS de nuestra página web. En el horario de 8am a 6 pm, de lunes a viernes, podrás tener respuesta a través del chat de nuestra página Web.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('promotions')}>
                          <h5 className="font-weight-bold">
                            ¿Todas las promociones de Mac Center aplican para compras Online?
                            {openQuestion['promotions'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['promotions']}>
                          <div>
                            <p>La gran mayoría de promociones están disponibles en nuestras tiendas físicas y Online. Sin embargo, hay promociones puntuales que pueden estar sujetas a cambios. Si tienes dudas comunícate con nuestro Equipo de Atención al Cliente a través del formulario de la sección CONTÁCTANOS de nuestra página web. En el horario de 8am a 6 pm, de lunes a viernes, podrás tener respuesta a través del chat de nuestra página Web.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('giftCard')}>
                          <h5 className="font-weight-bold">
                            ¿Puedo redimir una GiftCard Mac Center para compras Online?
                            {openQuestion['giftCard'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['giftCard']}>
                          <div>
                            <p>No. Solo de forma presencial en las tiendas Mac Center en todo el país.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('onlineSecurity')}>
                          <h5 className="font-weight-bold">
                            ¿Las compras Online en www.mac-center.com son 100% seguras?
                            {openQuestion['onlineSecurity'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['onlineSecurity']}>
                          <div>
                            <p>Comprar en nuestra tienda Online es 100% seguro. Nuestro aliado de pagos Mercadopago cuenta con la certificación PCI DSS para el manejo seguro de la información de todo tipo de tarjetas.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('securePurchase')}>
                          <h5 className="font-weight-bold">
                            ¿Cómo realizar una compra segura?
                            {openQuestion['securePurchase'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['securePurchase']}>
                          <div>
                            <ul>
                              <li>Realiza la compra preferiblemente desde tu computador personal o dispositivo móvil.</li>
                              <li>Digita la dirección www.mac-center.com desde un navegador seguro (Safari, Chrome o Firefox).</li>
                              <li>Asegúrate de contar con una buena conexión a internet y hacerlo desde un lugar seguro.</li>
                              <li>Deberás tener todos tus datos personales y bancarios a la mano para evitar que se cierre tu sesión y volver a iniciar el proceso de compra.</li>
                              <li>Para el manejo seguro de la información de tarjetas de crédito Visa, MasterCard, American Express y Dinners cuentan con la certificación PCI DSS.</li>
                            </ul>
                            <p>Cualquier duda o inquietud, podrás escribirnos al correo tiendaonline@mac-center.com o a través de nuestra página web www.mac-center.com en el formulario de “Contáctanos”. Más información, puedes consultar en nuestra página web la política de privacidad.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question" onClick={() => handleQuestionToggle('securePurchaseSteps')}>
                          <h5 className="font-weight-bold">
                            ¿Cómo realizar una compra segura?
                            {openQuestion['securePurchaseSteps'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                          </h5>
                        </div>
                        <Collapse in={openQuestion['securePurchaseSteps']}>
                          <div>
                            <ul>
                              <li>Verifica que los productos seleccionados estén en tu carrito de compras.</li>
                              <li>Da clic en “realizar pago”.</li>
                              <li>Ingresa tus datos personales y de envío en “Detalles de Facturación”.</li>
                              <li>Selecciona la forma de pago y sigue las instrucciones.</li>
                              <li>Verifica en tu cuenta de correo electrónico que hayas recibido el comprobante de pago (Boucher) de tu transacción.</li>
                            </ul>
                            <p>Cualquier duda o inquietud, podrás escribirnos al correo info@mac-center.com o a través de nuestra página web www.mac-center.com en el formulario de “Contáctanos”.</p>
                            <p>Los precios de todos los productos incluyen IVA.</p>
                          </div>
                        </Collapse>
                      </div>
                    </Collapse>
                  </div>
                   {/* Sección: Entrega y Envíos */}
                   <div className="faq-section mt-4">
                    <h4 
                      className="font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-3s faq-section-title" 
                      onClick={() => handleSectionToggle('deliveryAndShipping')}
                      aria-controls="deliveryAndShippingContent" 
                      aria-expanded={openSection['deliveryAndShipping']}
                    >
                      Entrega y Envíos
                      {openSection['deliveryAndShipping'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </h4>
                    <Collapse in={openSection['deliveryAndShipping']}>
                      <div id="deliveryAndShippingContent">
                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Qué pasa si yo no estaba en el momento de entrega?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>El producto se retorna y la empresa de mensajería hará 2 intentos de entrega adicionales sin ningún costo.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Qué pasa si el producto no es el que pedí o falta un artículo en mi pedido?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Ponte en contacto con nuestro Equipo de Atención Cliente a través del formulario de la sección CONTÁCTANOS de nuestra página web. En el horario de 8am a 6 pm, de lunes a viernes, podrás tener respuesta a través del chat de nuestra página Web para verificar las diferencias presentadas y realizar el proceso respectivo, para que puedas tener el producto que compraste.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Cómo hacer seguimiento a mi pedido?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Una vez despachado el producto, enviaremos el número de guía a tu correo electrónico, luego tendrás que ingresar a la página virtual de la transportadora Deprisa para realizar el seguimiento de tu pedido.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Qué hago si mi pedido se demora más de lo normal?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Ponte en contacto con nuestro Equipo de Atención Cliente a través del formulario de la sección CONTÁCTANOS de nuestra página web. En el horario de 8am a 6 pm, de lunes a viernes, podrás tener respuesta a través del chat de nuestra página Web para que te ayudemos a revisar los motivos. Ten en cuenta que nuestra política de tiempos de entrega es de 3 a 7 días hábiles, y en eventos especiales como Black Friday, Hotsale o Cyber Lunes entre otros, se pueden extender los días por el volumen de pedidos. Te notificaremos los tiempos de entrega al momento de tu compra.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Cuánto tiempo puede tardar en llegar mi producto?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Los tiempos de entrega generales que manejamos en nuestra tienda Online son de 3 a 7 días hábiles. Ten en cuenta que, en eventos especiales como Black Friday, Hotsale o Cyber Lunes entre otros, se pueden extender los días de entrega por el volumen de pedidos procesados. Entregas día sin IVA de 6 a 10 días hábiles. Te notificaremos los tiempos de entrega al momento de tu compra para que cuentes con dicha información.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Qué cobertura de entrega maneja Mac Center?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Todo el territorio a nivel nacional.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Puedo cambiar la dirección de entrega del producto?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Una vez ingreses los datos de envío de tu producto, no podrás hacer cambio de dirección de correspondencia, por lo cual debes ponerte en contacto con nuestro Equipo de Atención al Cliente a través del formulario de la sección CONTÁCTANOS de nuestra página web para que te podamos ayudar con la solución.</p>
                          </div>
                        </Collapse>

                        <div className="faq-question">
                          <h5 className="font-weight-bold">
                            ¿Qué hacer si el producto llega en mal estado?
                            <FaChevronDown className="ml-2" />
                          </h5>
                        </div>
                        <Collapse in={true}>
                          <div>
                            <p>Deberás realizar la reclamación de garantía correspondiente a través del formulario de la sección CONTÁCTANOS de nuestra página web. Ten en cuenta que, la reclamación debe hacerse dentro de las primeras 24 horas después de recibir el producto, ya que después de este tiempo la garantía no será válida.</p>
                          </div>
                        </Collapse>
                      </div>
                    </Collapse>
                  </div>
                  {/* Sección: Cambios, Devoluciones y Garantías */}
<div className="faq-section mt-4">
  <h4 
    className="font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-3s faq-section-title" 
    onClick={() => handleSectionToggle('returnsAndGuarantees')}
    aria-controls="returnsAndGuaranteesContent" 
    aria-expanded={openSection['returnsAndGuarantees']}
  >
    Cambios, Devoluciones y Garantías
    {openSection['returnsAndGuarantees'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
  </h4>
  <Collapse in={openSection['returnsAndGuarantees']}>
    <div id="returnsAndGuaranteesContent">
      {/* Garantías y cambios de productos comprados en línea */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('onlinePurchase')}>
          Garantías y cambios de productos comprados en línea
          {openQuestion['onlinePurchase'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['onlinePurchase']}>
          <div>
            <p>Sólo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras deberá comunicarse con nuestra tienda Mac Center más cercana.</p>
          </div>
        </Collapse>
      </div>

      {/* Garantía */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('warranty')}>
          Garantía
          {openQuestion['warranty'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['warranty']}>
          <div>
            <p>Los productos comercializados por Mac Center de la marca Apple® tienen una garantía vigente por un periodo de un (1) año contados a partir de la fecha de venta del producto.</p>
            <p>Los demás artículos y/o productos que no son de la marca Apple® podrán tener un término de garantía diferente, de acuerdo con lo establecido al momento de la compra, y según consta en el Resumen de Compra y Factura de Venta, previa a la aprobación de compra en línea.</p>
          </div>
        </Collapse>
      </div>

      {/* Ejercicio de exigibilidad de la garantía */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('warrantyExercise')}>
          Ejercicio de exigibilidad de la garantía
          {openQuestion['warrantyExercise'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['warrantyExercise']}>
          <div>
            <p>El cliente deberá comunicarse con Mac Center, a través de cualquiera de los medios que se señalan a continuación, o llevar el producto directamente a cualquier de nuestras tiendas a nivel nacional.</p>
          </div>
        </Collapse>
      </div>

      {/* Datos contacto servicio técnico */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('contactData')}>
          Datos contacto servicio técnico
          {openQuestion['contactData'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['contactData']}>
          <div>
            <p>Una vez despachado el producto, enviaremos el número de guía a tu correo electrónico. Luego tendrás que ingresar a la página virtual de la transportadora Deprisa para realizar el seguimiento de tu pedido.</p>
          </div>
        </Collapse>
      </div>

      {/* Respuesta de la garantía */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('warrantyResponse')}>
          Respuesta de la garantía
          {openQuestion['warrantyResponse'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['warrantyResponse']}>
          <div>
            <p>Mac Center remitirá a sus clientes una respuesta oficial acerca de la solicitud de ejercer su garantía, la cual podrá ser en dos sentidos:</p>
            <ul>
              <li>No procedencia de la garantía por encontrarse fuera del Término de la misma. En este caso le remitiremos los datos de nuestro Servicio Técnico para que el Cliente pueda comunicarse con ellos y dar una solución efectiva a sus necesidades.</li>
              <li>Procedencia de la garantía. Se le remitirá al Cliente los pasos a seguir para la revisión del producto y solución de los inconvenientes que se le presenten al Cliente, en particular los datos de la compañía de correos para coordinar la entrega del producto, instrucciones que el cliente deberá seguir de forma estricta para la validez de la garantía. Todos los gastos de envío del producto para hacer efectiva la garantía correrán por cuenta de Mac Center.</li>
            </ul>
          </div>
        </Collapse>
      </div>

      {/* Alcance la garantía y exigibilidad de la garantía */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('warrantyScope')}>
          Alcance la garantía y exigibilidad de la garantía
          {openQuestion['warrantyScope'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['warrantyScope']}>
          <div>
            <p>La garantía presentada por Mac Center comprende lo siguiente:</p>
            <ul>
              <li>La prestación gratuita de los servicios de reparación durante el periodo de vigencia de la garantía.</li>
              <li>La disponibilidad de piezas de recambio respecto de aquellas que se consideren de alta rotación.</li>
              <li>En caso de no ser posible la reparación o repetirse la falla, la garantía comprende el cambio del bien por uno igual o similar, o la devolución del dinero pagado por el producto.</li>
              <li>En el evento de que el Cliente haga exigible la garantía bajo la modalidad de cambio de producto o devolución del dinero, por considerarse que existe una falla reiterada, el Cliente deberá presentar la correspondiente Petición, Queja y Reclamo (PQR) por escrito, siguiendo nuestras políticas PQR. De esta solicitud se le dará respuesta al Cliente dentro de los quince [15] días hábiles siguiente, en sentido negativo o positivo.</li>
            </ul>
          </div>
        </Collapse>
      </div>

      {/* Políticas de reversión de pago y derecho de retracto */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('paymentReversal')}>
          Políticas de reversión de pago y derecho de retracto
          {openQuestion['paymentReversal'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['paymentReversal']}>
          <div>
            <p>Sólo aplica a las relaciones de consumo en línea o internet, no a compras de carácter corporativo y/o empresarial. Para tal tipo de compras deberá comunicarse con nuestra tienda Mac Center más cercana.</p>
            <p>El Plazo para la solicitud del derecho de retracto será dentro de los cinco (5) días hábiles.</p>
            <p>Si el retracto o solicitud de reversión es comunicado al personal de Mac Center el mismo día efectuada la compra dentro del horario laboral por cualquiera de los canales de comunicación, Mac Center procederá con la devolución del dinero, el cual tendrá un lapso de 6 a 10 días hábiles para que sea entregado al cliente con la totalidad del monto del pedido.</p>
          </div>
        </Collapse>
      </div>
    </div>
  </Collapse>
</div>
{/* Sección: Servicio Técnico */}
<div className="faq-section mt-2">
  <h4 
    className="font-weight-bold text-dark animate__animated animate__fadeIn animate__delay-3s faq-section-title" 
    onClick={() => handleSectionToggle('technicalService')}
    aria-controls="technicalServiceContent" 
    aria-expanded={openSection['technicalService']}
  >
    Servicio Técnico
    {openSection['technicalService'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
  </h4>
  <Collapse in={openSection['technicalService']}>
    <div id="technicalServiceContent">
      {/* Tiempo de garantía */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('warrantyDuration')}>
          ¿Cuánto tiempo de garantía tiene el producto?
          {openQuestion['warrantyDuration'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['warrantyDuration']}>
          <div>
            <p>Tiene un año de garantía en cualquiera de nuestros productos. Para mayor información de condiciones y restricciones, consulta en nuestra página web la política de privacidad.</p>
          </div>
        </Collapse>
      </div>

      {/* Tipo de servicio técnico */}
      <div className="faq-question">
        <h5 className="font-weight-bold" onClick={() => handleQuestionToggle('serviceType')}>
          ¿Qué tipo de servicio técnico puedo obtener?
          {openQuestion['serviceType'] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </h5>
        <Collapse in={openQuestion['serviceType']}>
          <div>
            <p>Daños desde fábrica, deberás acercarte a alguna de nuestras tiendas en las diferentes ciudades del país. Para conocer los puntos de atención haz clic en Tiendas.</p>
          </div>
        </Collapse>
      </div>
    </div>
  </Collapse>
</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default FAQ;
