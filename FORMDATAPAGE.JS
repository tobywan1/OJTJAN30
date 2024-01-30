import React, { useState } from 'react';
import { serverURL } from './config';

const FormDataPage = ({ history }) => {
  const [formData, setFormData] = useState({
    expressway: '',
    entry: '',
    exit: '',
    vehicleClass: '',
    vehicle: '',
    price: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = async () => {
    try {
      console.log('Trying to add data...');
      const response = await fetch(`${serverURL}/addTollGateData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const data = await response.json();

      if (data.success) {
        // Redirect back to the main page after adding new data
        history.push('/admin');
      } else {
        console.error('Error adding data:', data.message);
        alert(`Error adding data: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding data:', error);
      alert(`Error adding data: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>

      <form>
        <label>Expressway:</label>
        <input
          type="text"
          name="expressway"
          value={formData.expressway}
          onChange={handleInputChange}
        />
        <label>Entry:</label>
        <input
          type="text"
          name="entry"
          value={formData.entry}
          onChange={handleInputChange}
        />
        <label>Exit:</label>
        <input
          type="text"
          name="exit"
          value={formData.exit}
          onChange={handleInputChange}
        />
        <label>Vehicle Class:</label>
        <input
          type="text"
          name="vehicleClass"
          value={formData.vehicleClass}
          onChange={handleInputChange}
        />
        <label>Vehicle:</label>
        <input
          type="text"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleInputChange}
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddData}>
          Add Data
        </button>
      </form>

      <button type="button" onClick={() => history.push('/admin')}>
        Cancel
      </button>
    </div>
  );
};

export default FormDataPage;
