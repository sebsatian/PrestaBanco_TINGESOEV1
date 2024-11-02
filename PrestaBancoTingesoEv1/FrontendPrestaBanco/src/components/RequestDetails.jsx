import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestService from '../services/request.service.js';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RequestDetails.css';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState('');

  useEffect(() => {
    if (id !== null && request === null) {
      const fetchRequest = async () => {
        try {
          const response = await requestService.getRequestById(id);
          setRequest(response.data);
        } catch (error) {
          console.error('Error al obtener la solicitud:', error);
          setError('No se pudo obtener la solicitud. Por favor, vuelva a intentarlo.');
        }
      };
      
      fetchRequest();
    }
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
      setShowViewer(true);
      setActiveButton(buttonId);
    }
  };

  const closeDocument = () => {
    setShowViewer(false);
    setActiveButton(null);
  };

  const handleShowModal = (details) => {
    setModalDetails(details);
    setShowModal(true);
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!request) {
    return <div className="container mt-4">Cargando solicitud...</div>;
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
          <li
            className="list-group-item"
            style={{
              backgroundColor: request.currentStatus === 'Rechazada' || request.currentStatus === 'Pendiente de Documentación' ? '#f8d7da' : 'inherit'
            }}
          >
            <strong>Estado:</strong> 
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}>
              {request.currentStatus}
            </span>
            {(request.currentStatus === 'Rechazada' || request.currentStatus === 'Pendiente de Documentación') && (
              <Button variant="primary" onClick={() => handleShowModal(request.details)}>
                Ver detalles
              </Button>
            )}
          </li>
          <li className="list-group-item"><strong>Ingreso Mensual:</strong> {request.monthlyIncome}</li>
          <li className="list-group-item"><strong>Monto del Préstamo:</strong> {request.loanAmount}</li>
          <li className="list-group-item"><strong>Años:</strong> {request.years}</li>
          <li className="list-group-item"><strong>Pago Mensual:</strong> {request.monthlyPayment}</li>
          <li className="list-group-item"><strong>Tasa de Interés Anual:</strong> {request.annualInterestRate}</li>
          <li className="list-group-item">
            <strong>Certificado de Avalúo:</strong>
            <div className="button-container">
              <button className="document-button" onClick={() => showDocument(request.appraisalCertificate, 'appraisalCertificate')}>
                {activeButton === 'appraisalCertificate' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </div>
          </li>
          <li className="list-group-item">
            <strong>Comprobante de Ingresos:</strong>
            <div className="button-container">
              <button className="document-button" onClick={() => showDocument(request.incomeProof, 'incomeProof')}>
                {activeButton === 'incomeProof' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </div>
          </li>
          <li className="list-group-item">
            <strong>Cuenta de Ahorro:</strong>
            <div className="button-container">
              <button className="document-button" onClick={() => showDocument(request.savingsAccount, 'savingsAccount')}>
                {activeButton === 'savingsAccount' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </div>
          </li>
          {(() => {
            switch (request.loanType) {
              case 1: {
                return (
                  <>
                    {request.creditHistory && (
                      <li className="list-group-item">
                        <strong>Historial Crediticio:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.creditHistory, 'creditHistory')}>
                            {activeButton === 'creditHistory' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                    {request.jobContract && (
                      <li className="list-group-item">
                        <strong>Contrato de Trabajo:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.jobContract, 'jobContract')}>
                            {activeButton === 'jobContract' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                  </>
                );
              }
              case 2: {
                return (
                  <>
                    {request.firstHomeDeed && (
                      <li className="list-group-item">
                        <strong>Escritura de la Primera Vivienda:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.firstHomeDeed, 'firstHomeDeed')}>
                            {activeButton === 'firstHomeDeed' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                    {request.creditHistory && (
                      <li className="list-group-item">
                        <strong>Historial Crediticio:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.creditHistory, 'creditHistory')}>
                            {activeButton === 'creditHistory' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                    {request.jobContract && (
                      <li className="list-group-item">
                        <strong>Contrato de Trabajo:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.jobContract, 'jobContract')}>
                            {activeButton === 'jobContract' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                  </>
                );
              }
              case 3: {
                return (
                  <>
                    {request.businessPlan && (
                      <li className="list-group-item">
                        <strong>Plan de Negocios:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.businessPlan, 'businessPlan')}>
                            {activeButton === 'businessPlan' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                    {request.financialStatement && (
                      <li className="list-group-item">
                        <strong>Estado Financiero:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.financialStatement, 'financialStatement')}>
                            {activeButton === 'financialStatement' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                  </>
                );
              }
              case 4: {
                return (
                  <>
                    {request.remodelingBudget && (
                      <li className="list-group-item">
                        <strong>Presupuesto de Remodelación:</strong>
                        <div className="button-container">
                          <button className="document-button" onClick={() => showDocument(request.remodelingBudget, 'remodelingBudget')}>
                            {activeButton === 'remodelingBudget' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
                          </button>
                        </div>
                      </li>
                    )}
                  </>
                );
              }
              default: {
                return null;
              }
            }
          })()}
        </ul>
      </div>
      <div className="pdf-viewer">
        <iframe
          src={pdfUrl + "#toolbar=1"}
          title="Documento PDF"
          style={{ width: '75%', height: '100%' }}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notas del ejecutivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDetails}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RequestDetails;