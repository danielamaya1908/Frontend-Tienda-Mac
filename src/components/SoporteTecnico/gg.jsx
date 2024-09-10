import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const FormEquipo = () => {
  const navigate = useNavigate();

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serial, setSerial] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [clienteInfo, setClienteInfo] = useState(null);
  const [garantia, setGarantia] = useState(false);
  const [enciende, setEnciende] = useState(false);
  const [arranca, setArranca] = useState(false);
  const [parlantes, setParlantes] = useState(false);
  const [teclado, setTeclado] = useState(false);
  const [camara, setCamara] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [pinCarga, setPinCarga] = useState(false);
  const [auricular, setAuricular] = useState(false);
  const [botones, setBotones] = useState(false);
  const [pantalla, setPantalla] = useState(false);
  const [golpes, setGolpes] = useState(false);
  const [rayones, setRayones] = useState(false);
  const [puertos, setPuertos] = useState(false);
  const [imagenesEstado, setImagenesEstado] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('marca', marca);
    formData.append('modelo', modelo);
    formData.append('serial', serial);
    formData.append('DocumentNumber', documentNumber);
    formData.append('garantia', garantia);
    formData.append('enciende', enciende);
    formData.append('arranca', arranca);
    formData.append('parlantes', parlantes);
    formData.append('teclado', teclado);
    formData.append('camara', camara);
    formData.append('bluetooth', bluetooth);
    formData.append('wifi', wifi);
    formData.append('pinCarga', pinCarga);
    formData.append('auricular', auricular);
    formData.append('botones', botones);
    formData.append('pantalla', pantalla);
    formData.append('golpes', golpes);
    formData.append('rayones', rayones);
    formData.append('puertos', puertos);
    formData.append('fechaIngreso', new Date().toISOString());

    imagenesEstado.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:3005/soporte-tecnico', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Limpiar el formulario después de enviar
      setMarca('');
      setModelo('');
      setSerial('');
      setDocumentNumber('');
      setGarantia(false);
      setEnciende(false);
      setArranca(false);
      setParlantes(false);
      setTeclado(false);
      setCamara(false);
      setBluetooth(false);
      setWifi(false);
      setPinCarga(false);
      setAuricular(false);
      setBotones(false);
      setPantalla(false);
      setGolpes(false);
      setRayones(false);
      setPuertos(false);
      setImagenesEstado([]);
      setPreviews([]);
      setClienteInfo(null);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenesEstado(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviews(previews);
  };

  const handleVolver = () => {
    navigate(-1); // Regresar a la página anterior
  };

  const handleDocumentNumberChange = async (e) => {
    const value = e.target.value;
    setDocumentNumber(value);

    if (value) {
      try {
        const response = await axios.get(`http://localhost:3005/soporte-tecnico/cliente/${value}`);
        console.log('Datos del cliente:', response.data); // Verifica la estructura de los datos
        setClienteInfo(response.data);
        setError('');
      } catch (error) {
        setClienteInfo(null);
        setError('No se encontró un cliente con ese número de documento.');
      }
    } else {
      setClienteInfo(null);
      setError('');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Header as="h3" className="text-center">Registro de Equipo</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="marca" className="mb-3">
              <Form.Label column sm={3}>Marca:</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  value={marca} 
                  onChange={(e) => setMarca(e.target.value)} 
                  placeholder="Ingrese la marca del equipo" 
                  required 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="modelo" className="mb-3">
              <Form.Label column sm={3}>Modelo:</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  value={modelo} 
                  onChange={(e) => setModelo(e.target.value)} 
                  placeholder="Ingrese el modelo del equipo" 
                  required 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="serial" className="mb-3">
              <Form.Label column sm={3}>Serial:</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  value={serial} 
                  onChange={(e) => setSerial(e.target.value)} 
                  placeholder="Ingrese el número de serial" 
                  required 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="documentNumber" className="mb-3">
              <Form.Label column sm={3}>Número de Documento:</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  value={documentNumber} 
                  onChange={handleDocumentNumberChange} 
                  placeholder="Ingrese el número de documento" 
                  required 
                />
              </Col>
            </Form.Group>

            {error && (
              <Alert variant="danger">{error}</Alert>
            )}

            {clienteInfo && (
              <Alert variant="success" className="mt-2">
                Cliente encontrado: {clienteInfo.firstName} {clienteInfo.lastName}
              </Alert>
            )}

            <Form.Group as={Row} controlId="garantia" className="mb-3">
              <Form.Label column sm={3}>Garantía:</Form.Label>
              <Col sm={9}>
                <Form.Check 
                  type="checkbox" 
                  checked={garantia} 
                  onChange={() => setGarantia(!garantia)} 
                  label="Sí" 
                />
              </Col>
            </Form.Group>

            {/* Campos adicionales del formulario */}
            <Form.Group as={Row} controlId="enciende" className="mb-3">
              <Form.Label column sm={3}>Enciende:</Form.Label>
              <Col sm={9}>
                <Form.Check 
                  type="checkbox" 
                  checked={enciende} 
                  onChange={() => setEnciende(!enciende)} 
                  label="Sí" 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="arranca" className="mb-3">
              <Form.Label column sm={3}>Arranca:</Form.Label>
              <Col sm={9}>
                <Form.Check 
                  type="checkbox" 
                  checked={arranca} 
                  onChange={() => setArranca(!arranca)} 
                  label="Sí" 
                />
              </Col>
            </Form.Group>

            {/* Más campos del formulario como parlantes, teclado, etc. */}

            <Form.Group as={Row} controlId="imagenes" className="mb-3">
              <Form.Label column sm={3}>Imágenes:</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="file" 
                  multiple 
                  onChange={handleImagenesChange} 
                />
                {previews.length > 0 && (
                  <div className="mt-3">
                    {previews.map((preview, index) => (
                      <img 
                        key={index} 
                        src={preview} 
                        alt={`Preview ${index}`} 
                        className="img-thumbnail" 
                        style={{ width: '100px', height: '100px', marginRight: '10px' }} 
                      />
                    ))}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Row className="justify-content-between">
              <Col sm={3}>
                <Button variant="secondary" onClick={handleVolver}>Volver</Button>
              </Col>
              <Col sm={3} className="text-end">
                <Button variant="primary" type="submit">Registrar</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormEquipo;
