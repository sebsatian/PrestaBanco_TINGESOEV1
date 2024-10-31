import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestService from '../services/request.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RequestDetails.css';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    requestService.getRequestById(id)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la solicitud:', error);
        setError('No se pudo obtener la solicitud. Por favor, vuelva a intentarlo.');
      });
  }, [id]);

  const showDocument = (base64Document, buttonId) => {
    if (activeButton === buttonId && showViewer) {
      closeDocument();
    } else if (base64Document) {
      const byteCharacters = atob(base64Document);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setShowViewer(true); // Activa split-view para el deslizamiento
      setActiveButton(buttonId);
    }
  };

  const closeDocument = () => {
    setShowViewer(false); // Quita split-view para devolver el visor fuera de la vista
    setActiveButton(null);
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!request) {
    return <div className="container mt-5">Cargando solicitud...</div>;
  }

  return (
    <div className={`request-container ${showViewer ? 'split-view' : ''}`}>
      <div className="request-details" style={{ width: showViewer ? '40%' : '40%' }}>
        <h2>Detalles de la Solicitud</h2>
        <ul className="list-group">
          <li className="list-group-item"><strong>ID:</strong> {request.id}</li>
          <li className="list-group-item"><strong>Fecha de Creación:</strong> {new Date(request.creationDate).toLocaleString()}</li>
          <li className="list-group-item"><strong>RUT del Cliente:</strong> {request.clientRut}</li>
          <li className="list-group-item"><strong>Tipo de Préstamo:</strong> {request.loanType}</li>
          <li className="list-group-item"><strong>Estado:</strong> {request.currentStatus}</li>
          <li className="list-group-item"><strong>Ingreso Mensual:</strong> {request.monthlyIncome}</li>
          <li className="list-group-item"><strong>Monto del Préstamo:</strong> {request.loanAmount}</li>
          <li className="list-group-item"><strong>Años:</strong> {request.years}</li>
          <li className="list-group-item"><strong>Pago Mensual:</strong> {request.monthlyPayment}</li>
          <li className="list-group-item"><strong>Tasa de Interés Anual:</strong> {request.annualInterestRate}</li>
          <li className="list-group-item">
            <strong>Certificado de Avalúo:</strong>
            <button className="document-button" onClick={() => showDocument(request.appraisalCertificate, 'appraisalCertificate')}>
              {activeButton === 'appraisalCertificate' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
            </button>
          </li>
          <li className="list-group-item">
            <strong>Comprobante de Ingresos:</strong>
            <button className="document-button" onClick={() => showDocument(request.incomeProof, 'incomeProof')}>
              {activeButton === 'incomeProof' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
            </button>
          </li>
          {request.creditHistory && (
            <li className="list-group-item">
              <strong>Historial Crediticio:</strong>
              <button className="document-button" onClick={() => showDocument(request.creditHistory, 'creditHistory')}>
                {activeButton === 'creditHistory' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {request.jobContract && (
            <li className="list-group-item">
              <strong>Contrato de Trabajo:</strong>
              <button className="document-button" onClick={() => showDocument(request.jobContract, 'jobContract')}>
                {activeButton === 'jobContract' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {request.remodelingBudget && (
            <li className="list-group-item">
              <strong>Presupuesto de Remodelación:</strong>
              <button className="document-button" onClick={() => showDocument(request.remodelingBudget, 'remodelingBudget')}>
                {activeButton === 'remodelingBudget' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {request.financialStatement && (
            <li className="list-group-item">
              <strong>Estado Financiero:</strong>
              <button className="document-button" onClick={() => showDocument(request.financialStatement, 'financialStatement')}>
                {activeButton === 'financialStatement' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {request.businessPlan && (
            <li className="list-group-item">
              <strong>Plan de Negocios:</strong>
              <button className="document-button" onClick={() => showDocument(request.businessPlan, 'businessPlan')}>
                {activeButton === 'businessPlan' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="pdf-viewer">
        <iframe
          src={pdfUrl + "#toolbar=0"}
          title="Documento PDF"
          style={{ width: '85%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default RequestDetails;