import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
import SimulationDetails from './components/SimulationDetails';
import SimulateLoan from './components/SimulateLoan';
import SimulationEdit from './components/SimulationEdit';
import EditLoanTypes from './components/EditLoanTypes';
import ViewLoanTypes from './components/ViewLoanTypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';

function App() {
  return (
    <Router>
      {/* Botón fijo siempre visible */}
      <div style={styles.fixedButtonContainer}>
        <Link to="/">
          <button style={styles.fixedButton}>Inicio</button>
        </Link>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={
            <div style={styles.container}>
              <h1>Bienvenido a la Aplicación</h1>
              <Link to="/register">
                <button style={styles.button}>Registrar Cliente</button>
              </Link>
              <Link to="/simulate">
                <button style={styles.button}>Simular un crédito</button>
              </Link>
              <Link to="/loan-types/view">
                <button style={styles.button}>Tasa de interés anual</button>
              </Link>
            </div>
          }
        />
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/simulate" element={<SimulateLoan />} />
        <Route path="/simulation/simulate/:simulationId" element={<SimulationDetails />} />
        <Route path="/simulation/change/:simulationId" element={<SimulationEdit />} />
        <Route path="/loan-types/edit" element={<EditLoanTypes />} />
        <Route path="/loan-types/view" element={<ViewLoanTypes />} />
      </Routes>
    </Router>
  );
}

const styles = {
  fixedButtonContainer: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1000, // Asegura que el botón esté por encima de otros elementos
  },
  fixedButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default App;
