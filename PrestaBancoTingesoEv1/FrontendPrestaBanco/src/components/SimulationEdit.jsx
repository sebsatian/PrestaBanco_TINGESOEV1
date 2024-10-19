import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import simulateService from '../services/simulate.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UpdateSimulation = ({ simulationId }) => {
  const [simulation, setSimulation] = useState(null);
  const [maxPercentage, setMaxPercentage] = useState(100);
  const [maxYears, setMaxYears] = useState(52);
  const navigate = useNavigate();

  useEffect(() => {
    if (!simulationId) {
      console.error('simulationId is required but was not provided.');
      return;
    }

    const fetchSimulation = async () => {
      try {
        const response = await simulateService.getSimulationById(simulationId);
        const data = response.data;
        setSimulation({
          propertyValue: data.propertyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          loanType: data.loanType.toString(),
          years: data.years,
          percentage: data.percentage * 100,
        });
        handleLoanTypeChange(data.loanType);
      } catch (err) {
        console.error("Error fetching simulation data: ", err);
      }
    };
    fetchSimulation();
  }, [simulationId]);

  const formatPropertyValue = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    return cleanValue.length > 11 ? simulation?.propertyValue : cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSimulation((prev) => {
      if (name === 'propertyValue') {
        return { ...prev, [name]: formatPropertyValue(value) };
      } else if (name === 'loanType') {
        handleLoanTypeChange(value);
        return { ...prev, loanType: value, percentage: 1, years: 1 };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleLoanTypeChange = (loanType) => {
    switch (loanType) {
      case '1':
        setMaxPercentage(80);
        setMaxYears(30);
        break;
      case '2':
        setMaxPercentage(70);
        setMaxYears(20);
        break;
      case '3':
        setMaxPercentage(60);
        setMaxYears(25);
        break;
      case '4':
        setMaxPercentage(50);
        setMaxYears(15);
        break;
      default:
        setMaxPercentage(100);
        setMaxYears(52);
    }
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setSimulation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!simulationId) {
      return;
    }
    e.preventDefault();

    if (!simulation.propertyValue || !simulation.loanType) {
      return;
    }

    const requestPayload = {
      propertyValue: parseInt(simulation.propertyValue.replace(/[^0-9]/g, ''), 10),
      loanType: parseInt(simulation.loanType, 10),
      years: parseInt(simulation.years, 10),
      percentage: parseFloat(simulation.percentage) / 100,
    };
    console.log("Request Payload:", requestPayload);
    try {
      const response = await simulateService.updateSimulation(simulationId, requestPayload);
      if (response?.data) {
        navigate(`/simulation/simulate/${simulationId}`);
      }
    } catch {
      // Error handling
    }
  };

  if (!simulation) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-3" style={{ paddingTop: '1rem', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'hidden' }}>  
      <h2>Editar Simulación de Crédito</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="form-group mt-3">
          <label htmlFor="propertyValue">Valor de la Propiedad</label>
          <input
            type="text"
            className="form-control"
            id="propertyValue"
            name="propertyValue"
            value={simulation.propertyValue}
            onChange={handleChange}
            placeholder="Ingrese el valor de la propiedad"
            required
            maxLength="12"
          />
          <div className="invalid-feedback">
            Por favor ingrese un valor de propiedad válido.
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="loanType">Tipo de Préstamo</label>
          <select
            className="form-select"
            id="loanType"
            name="loanType"
            value={simulation.loanType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione el tipo de préstamo...</option>
            <option value="1">Primera vivienda</option>
            <option value="2">Segunda vivienda</option>
            <option value="3">Propiedades comerciales</option>
            <option value="4">Remodelación</option>
          </select>
          <div className="invalid-feedback">
            Por favor seleccione un tipo de préstamo válido.
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="years">Cantidad de Años</label>
          <input
            type="range"
            className="form-range" style={{ height: '10px' }}
            id="years"
            name="years"
            min="1"
            max={maxYears}
            value={simulation.years}
            onChange={handleSliderChange}
            disabled={!simulation.loanType}
          />
          <div>{simulation.years} {parseInt(simulation.years, 10) === 1 ? 'año' : 'años'}</div>
          <div className="invalid-feedback">
            Por favor ingrese una cantidad de años válida (1-{maxYears}).
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="percentage">Porcentaje (%)</label>
          <input
            type="range"
            className="form-range"
            id="percentage"
            name="percentage"
            min="1"
            max={maxPercentage}
            value={simulation.percentage}
            onChange={handleSliderChange}
            disabled={!simulation.loanType}
          />
          <div>{simulation.percentage}%</div>
          <div className="invalid-feedback">
            Por favor ingrese un porcentaje válido.
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSimulation;

UpdateSimulation.propTypes = {
  simulationId: PropTypes.number.isRequired,
};
