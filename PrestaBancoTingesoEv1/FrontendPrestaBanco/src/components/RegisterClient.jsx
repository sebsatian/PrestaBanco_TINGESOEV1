import { useState } from 'react';
import clientService from '../services/client.service';

const RegisterClient = () => {
  const [client, setClient] = useState({
    userType: '',
    rut: '',
    name: '',
    birthDate: '',
    password: '',
  });

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clientService.registerClient(client);
      console.log('Client registered:', response.data);
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register a Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userType">User Type</label>
          <input
            type="text"
            className="form-control"
            id="userType"
            name="userType"
            value={client.userType}
            onChange={handleChange}
            placeholder="Enter user type"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            className="form-control"
            id="rut"
            name="rut"
            value={client.rut}
            onChange={handleChange}
            placeholder="Enter RUT"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={client.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={client.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterClient;
