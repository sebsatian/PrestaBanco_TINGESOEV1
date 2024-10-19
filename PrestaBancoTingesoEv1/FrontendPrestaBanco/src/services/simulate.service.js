// services/simulate.service.js
import http from '../http-common';

const simulateLoan = (simulationData) => {
  return http.post('/simulation/simulate', simulationData);
};

const getSimulationById = (simulationId) => {
  return http.get(`/simulation/simulate/${simulationId}`);
};

const updateSimulation = (simulationId, updatedSimulation) => {
  return http.put(`/simulation/change/${simulationId}`, updatedSimulation);
};

// Asegúrate de incluir updateSimulation aquí
export default {
  simulateLoan,
  getSimulationById,
  updateSimulation,
};
