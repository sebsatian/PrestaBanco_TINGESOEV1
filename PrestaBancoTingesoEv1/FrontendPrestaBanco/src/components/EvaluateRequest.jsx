import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestService from '../services/request.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EvaluateRequest.css';

const EvaluateRequest = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    request: {},
    creationSavingAccountDate: '',
    jobStatus: false,
    balance: '',
    sumAllDeposits: '',
    balance12MonthsAgo: '',
    biggestWithdrawalLast12Months: '',
    balanceAfterBw12Months: '',
    biggestWithdrawalLast6Months: '',
    balanceAfterBw6Months: '',
    numDepositsFirst4Months: '',
    numDepositsLast4Months: '',
    numDepositsSecond4Months: '',
    creditHistory: false,
    sumAllDebts: ''
  });
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await requestService.getRequestById(id);
        setFormData((prevData) => ({
          ...prevData,
          request: response.data
        }));
      } catch (error) {
        console.error('Error al obtener la solicitud:', error);
        setError('No se pudo obtener la solicitud. Por favor, vuelva a intentarlo.');
      }
    };

    fetchRequest();
  }, [id]);

  const formatCurrency = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    return cleanValue.length > 11 ? formData.balance : `$${cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : name.includes('balance') || name.includes('sum') || name.includes('biggestWithdrawal') ? formatCurrency(value) : value,
    }));
  };

  const showDocument = (documentData, buttonId) => {
    if (activeButton === buttonId && showViewer) {
      closeDocument();
    } else if (documentData) {
      const byteCharacters = atob(documentData);
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

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className={`evaluate-request-container ${showViewer ? 'split-view' : ''}`}>
      <div className="evaluate-request-details" style={{ width: showViewer ? '40%' : '40%' }}>
        <h2>Documentos</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Certificado de Avalúo:</strong>
            <button className="eval-document-button" onClick={() => showDocument(formData.request.appraisalCertificate, 'appraisalCertificate')}>
              {activeButton === 'appraisalCertificate' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
            </button>
          </li>
          <li className="list-group-item">
            <strong>Comprobante de Ingresos:</strong>
            <button className="eval-document-button" onClick={() => showDocument(formData.request.incomeProof, 'incomeProof')}>
              {activeButton === 'incomeProof' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
            </button>
          </li>
          {formData.request.creditHistory && (
            <li className="list-group-item">
              <strong>Historial Crediticio:</strong>
              <button className="eval-document-button" onClick={() => showDocument(formData.request.creditHistory, 'creditHistory')}>
                {activeButton === 'creditHistory' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {formData.request.jobContract && (
            <li className="list-group-item">
              <strong>Contrato de Trabajo:</strong>
              <button className="eval-document-button" onClick={() => showDocument(formData.request.jobContract, 'jobContract')}>
                {activeButton === 'jobContract' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {formData.request.remodelingBudget && (
            <li className="list-group-item">
              <strong>Presupuesto de Remodelación:</strong>
              <button className="eval-document-button" onClick={() => showDocument(formData.request.remodelingBudget, 'remodelingBudget')}>
                {activeButton === 'remodelingBudget' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {formData.request.financialStatement && (
            <li className="list-group-item">
              <strong>Estado Financiero:</strong>
              <button className="eval-document-button" onClick={() => showDocument(formData.request.financialStatement, 'financialStatement')}>
                {activeButton === 'financialStatement' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
          {formData.request.businessPlan && (
            <li className="list-group-item">
              <strong>Plan de Negocios:</strong>
              <button className="eval-document-button" onClick={() => showDocument(formData.request.businessPlan, 'businessPlan')}>
                {activeButton === 'businessPlan' && showViewer ? 'Cerrar PDF' : 'Ver Documento'}
              </button>
            </li>
          )}
        </ul>
        <h2 className="text-center mb-4">Evaluar Solicitud</h2>
        <form>
          {}
          <div className="form-group mt-3">
            <label htmlFor="creationSavingAccountDate">Fecha de Creación de la Cuenta de Ahorro</label>
            <input
              type="date"
              className="form-control"
              id="creationSavingAccountDate"
              name="creationSavingAccountDate"
              value={formData.creationSavingAccountDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="jobStatus">Estado Laboral</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="jobStatus"
              name="jobStatus"
              checked={formData.jobStatus}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="balance">Saldo</label>
            <input
              type="text"
              className="form-control"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="creditHistory">Historial Crediticio</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="creditHistory"
              name="creditHistory"
              checked={formData.creditHistory}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="sumAllDebts">Suma de Todas las Deudas</label>
            <input
              type="text"
              className="form-control"
              id="sumAllDebts"
              name="sumAllDebts"
              value={formData.sumAllDebts}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="sumAllDeposits">Suma de Todos los Depósitos</label>
            <input
              type="text"
              className="form-control"
              id="sumAllDeposits"
              name="sumAllDeposits"
              value={formData.sumAllDeposits}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="balance12MonthsAgo">Saldo Hace 12 Meses</label>
            <input
              type="text"
              className="form-control"
              id="balance12MonthsAgo"
              name="balance12MonthsAgo"
              value={formData.balance12MonthsAgo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="biggestWithdrawalLast12Months">Mayor Retiro en los Últimos 12 Meses</label>
            <input
              type="text"
              className="form-control"
              id="biggestWithdrawalLast12Months"
              name="biggestWithdrawalLast12Months"
              value={formData.biggestWithdrawalLast12Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="balanceAfterBw12Months">Saldo Después del Mayor Retiro en los Últimos 12 Meses</label>
            <input
              type="text"
              className="form-control"
              id="balanceAfterBw12Months"
              name="balanceAfterBw12Months"
              value={formData.balanceAfterBw12Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="biggestWithdrawalLast6Months">Mayor Retiro en los Últimos 6 Meses</label>
            <input
              type="text"
              className="form-control"
              id="biggestWithdrawalLast6Months"
              name="biggestWithdrawalLast6Months"
              value={formData.biggestWithdrawalLast6Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="balanceAfterBw6Months">Saldo Después del Mayor Retiro en los Últimos 6 Meses</label>
            <input
              type="text"
              className="form-control"
              id="balanceAfterBw6Months"
              name="balanceAfterBw6Months"
              value={formData.balanceAfterBw6Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="numDepositsFirst4Months">Número de Depósitos en los Primeros 4 Meses</label>
            <input
              type="number"
              className="form-control"
              id="numDepositsFirst4Months"
              name="numDepositsFirst4Months"
              value={formData.numDepositsFirst4Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="numDepositsSecond4Months">Número de Depósitos en los Segundos 4 Meses</label>
            <input
              type="number"
              className="form-control"
              id="numDepositsSecond4Months"
              name="numDepositsSecond4Months"
              value={formData.numDepositsSecond4Months}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="numDepositsLast4Months">Número de Depósitos en los Últimos 4 Meses</label>
            <input
              type="number"
              className="form-control"
              id="numDepositsLast4Months"
              name="numDepositsLast4Months"
              value={formData.numDepositsLast4Months}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button type="submit" className="btn btn-primary mt-4">
            Evaluar Solicitud
          </button>
        </form>
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

export default EvaluateRequest;