import React, { useState } from 'react';
import './App.css'

const transportData = [
  {type: "Plane", carbon_footprint_km: 255},
  {type: "Bus", carbon_footprint_km: 105},
  {type: "Car", carbon_footprint_km: 96},
  {type: "Motorbike", carbon_footprint_km: 80},
  {type: "Train", carbon_footprint_km: 41},
  {type: "Bike", carbon_footprint_km: 22},
  {type: "Walking", carbon_footprint_km: 19}
];

const App = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [transportation, setTransportation] = useState('');
  const [distance, setDistance] = useState('');
  const [emissions, setEmissions] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const transport = transportData.find(t => t.type === transportation);
    const emissionsPerKm = transport.carbon_footprint_km;
    const totalEmissions = emissionsPerKm * distance;
    const newEmployeeData = [...employeeData, {
      name: e.target.elements.name.value,
      transportation: transportation,
      distance: distance,
      emissions: totalEmissions
    }];
    setEmployeeData(newEmployeeData);
  }

  return (
    <div className='App'>
      <form onSubmit={handleFormSubmit}>
        <h1>Emission Calculator</h1>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Transportation:
          <select value={transportation} onChange={e => setTransportation(e.target.value)}>
            <option value="">Select transportation</option>
            {transportData.map(t => <option key={t.type} value={t.type}>{t.type}</option>)}
          </select>
        </label>
        <br />
        <label>
          Distance (km):
          <input type="number" value={distance} onChange={e => setDistance(e.target.value)} />
        </label>
        <br />
        <button type="submit">Post</button>
      </form>
      {emissions > 0 && (
        <div>
          <h2>CO2 Emissions: {emissions} kg</h2>
        </div>
      )}
      {employeeData.length > 0 && (
        <div>
          <h1>Dashboard</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Transportation</th>
                <th>Distance (km)</th>
                <th>Emissions (kg)</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.transportation}</td>
                  <td>{employee.distance}</td>
                  <td>{employee.emissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
