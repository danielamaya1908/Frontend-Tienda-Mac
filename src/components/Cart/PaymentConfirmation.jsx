import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de instalar esta librería para tablas
import styles from './PaymentConfirmation.module.css';
import logo from '../../img/Logo-letras-huecas-2-1536x985.png'; // Asegúrate de tener un logo en la ruta especificada
import Navbar from '../NavBar/NavBar'; // Ajusta la ruta si es necesario
import Footer from '../Footer/Footer'; // Ajusta la ruta si es necesario

const PaymentConfirmation = () => {
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const chargeId = queryParams.get('id');

  useEffect(() => {
    if (!chargeId) {
      setError('No se recibió un ID de cargo válido.');
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`https://backend-tienda-mac-production.up.railway.app/api/openpay/confirm-payment/${chargeId}`);
        setPaymentDetails(response.data);
      } catch (err) {
        setError('No se pudo obtener los detalles del pago.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [chargeId]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date(dateString).toLocaleDateString('es-ES', options).replace(',', '');
  };

  const formatCurrency = (amount) => {
    return `$ ${parseFloat(amount).toLocaleString('es-CO')} COP`;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Añadir el logo
      doc.addImage(img, 'PNG', 10, 10, 50, 20); // Ajusta la posición y tamaño según sea necesario
      
      doc.setFontSize(16);
      doc.text('Confirmación de Pago', 14, 35);

      doc.setFontSize(12);
      doc.text(`Transacción: ${paymentDetails.charge_id}`, 14, 50);
      doc.text(`Valor Pagado: ${formatCurrency(paymentDetails.amount)}`, 14, 60);
      doc.text(`Descripción: ${paymentDetails.description}`, 14, 70);
      doc.text(`Fecha de Pago: ${formatDate(paymentDetails.creation_date)}`, 14, 80);
      doc.text(`Fecha de Transacción: ${formatDate(paymentDetails.operation_date)}`, 14, 90);
      doc.text(`Estado: ${paymentDetails.status === 'completed' ? 'Pago Exitoso' : paymentDetails.status}`, 14, 100);
      doc.text(`Método de Pago: ${paymentDetails.method === 'bank_account' ? 'PSE' : paymentDetails.method}`, 14, 110);
      doc.text(`Nombre del Cliente: ${paymentDetails.customer_name}`, 14, 120);

      // Añadir tabla con detalles del pago
      doc.autoTable({
        startY: 135,
        head: [['Descripción', 'Detalles']],
        body: [
          ['Transacción', paymentDetails.charge_id],
          ['Valor Pagado', formatCurrency(paymentDetails.amount)],
          ['Descripción', paymentDetails.description],
          ['Fecha de Pago', formatDate(paymentDetails.creation_date)],
          ['Fecha de Transacción', formatDate(paymentDetails.operation_date)],
          ['Estado', paymentDetails.status === 'completed' ? 'Pago Exitoso' : paymentDetails.status],
          ['Método de Pago', paymentDetails.method === 'bank_account' ? 'PSE' : paymentDetails.method],
          ['Nombre del Cliente', paymentDetails.customer_name]
        ],
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] }, // Color verde para encabezado
        styles: { fontSize: 12 },
        margin: { horizontal: 10 }
      });

      // Añadir una línea horizontal para separación
      doc.setLineWidth(0.5);
      doc.line(10, doc.autoTable.previous.finalY + 10, 200, doc.autoTable.previous.finalY + 10); // Línea horizontal
      doc.text('Gracias por tu compra!', 14, doc.autoTable.previous.finalY + 20);

      doc.save('recibo_pago.pdf');
    };
  };

  if (loading) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!paymentDetails) {
    return <p className={styles.noDetails}>No se encontraron detalles del pago.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Confirmación de Pago</h1>
        <p className={styles.message}>Tu pago ha sido procesado con éxito.</p>
        <div className={styles.summary}>
          <p className={styles.details}><strong>Transacción:</strong> {paymentDetails.charge_id}</p>
          <p className={styles.details}><strong>Valor Pagado:</strong> {formatCurrency(paymentDetails.amount)}</p>
          <p className={styles.details}><strong>Descripción:</strong> {paymentDetails.description}</p>
          <p className={styles.details}><strong>Fecha de Pago:</strong> {formatDate(paymentDetails.creation_date)}</p>
          <p className={styles.details}><strong>Fecha de Transacción:</strong> {formatDate(paymentDetails.operation_date)}</p>
          <p className={styles.details}><strong>Estado:</strong> {paymentDetails.status === 'completed' ? 'Pago Exitoso' : paymentDetails.status}</p>
          <p className={styles.details}><strong>Método de Pago:</strong> {paymentDetails.method === 'bank_account' ? 'PSE' : paymentDetails.method}</p>
          <p className={styles.details}><strong>Nombre del Cliente:</strong> {paymentDetails.customer_name}</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleDownloadPDF} className={styles.downloadButton}>Descargar Recibo</button>
          <a href="/" className={styles.button}>Volver a la tienda</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
