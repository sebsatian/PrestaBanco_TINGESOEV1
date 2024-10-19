import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
import SimulationDetails from './components/SimulationDetails'; // Importa el componente
import SimulateLoan from './components/SimulateLoan';
import SimulationEdit from './components/SimulationEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css'; 

function App() {
  return (
    <Router>
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
            </div>
          } 
        />
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/simulate" element={<SimulateLoan />} />
        <Route path="/simulation/simulate/:simulationId" element={<SimulationDetails />} />
        <Route path="/simulation/change/:simulationId" element={<SimulationEdit />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '90vw',
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
