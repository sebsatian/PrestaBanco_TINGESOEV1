import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterClient from './components/RegisterClient';
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
            </div>
          } 
        />
        <Route path="/register" element={<RegisterClient />} />
        {/* Otras rutas */}
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
