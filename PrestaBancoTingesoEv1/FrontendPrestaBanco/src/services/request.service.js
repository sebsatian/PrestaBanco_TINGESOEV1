import http from '../http-common';

const createFirstHomeRequest = (formData) => {
  return http.post('/firsthomereq/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const createSecondHomeRequest = (formData) => {
  return http.post('/secondhomereq/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const createRemodelingRequest = (formData) => {
  return http.post('/remodelingreq/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const createBusinessRequest = (formData) => {
  return http.post('/businessreq/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const evaluateRequest = (formData) => {
  return http.post('/evaluation/evaluate', formData);
};

const getSimulationById = (simulationId) => {
  return http.get(`/simulate/${simulationId}`);
};


const getLoanTypeById = (loanTypeId) => {
  return http.get(`/loan-types/${loanTypeId}`);
};


const getAllRequests = () => {
  return http.get('/requests/all');
};


const getRequestById = (id) => {
  return http.get(`/requests/${id}`);
};


const getRequestsByRut = (rut) => {
  return http.get(`/requests/rut/${rut}`);
};

const getAppraisalCertificate = (id) => {
  return http.get(`/requests/${id}/appraisalCertificate`, { responseType: 'arraybuffer' });
};


export default {
  getSimulationById,
  createFirstHomeRequest,
  createSecondHomeRequest,
  createRemodelingRequest,
  getAppraisalCertificate,
  createBusinessRequest,
  evaluateRequest, 
  getLoanTypeById,
  getAllRequests,
  getRequestById,
  getRequestsByRut, 
};