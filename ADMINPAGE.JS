// AdminPage.js

import React, { useState, useEffect } from 'react';
import { serverURL } from './config';
import './AdminPage.css';


const AdminPage = () => {
  const [tollGateData, setTollGateData] = useState([]);
  const [formData, setFormData] = useState({
    expressway: '',
    entry: '',
    exit: '',
    vehicleClass: '',
    vehicle: '',
    price: '',
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Fetch all toll gate data
    fetch(`${serverURL}/getAllTollGateData`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
        setTollGateData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  

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
      // Update tollGateData after adding new data
      setTollGateData((prevData) => [...prevData, data.data]);
      setFormData({
        expressway: '',
        entry: '',
        exit: '',
        vehicleClass: '',
        vehicle: '',
        price: '',
      });
      setIsCreating(false); // Switch back to display mode after adding data
    } else {
      console.error('Error adding data:', data.message);
      alert(`Error adding data: ${data.message}`);
    }
  } catch (error) {
    console.error('Error adding data:', error);
    alert(`Error adding data: ${error.message}`);
  }
};

  
  

  const handleEdit = (id) => {
    // Implement edit functionality
    // You can redirect to a modal or a separate page for editing
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    // Make a DELETE request to your server
    fetch(`${serverURL}/deleteTollGateData/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update tollGateData after deletion
        setTollGateData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  return (
    <div>
      <h2>Admin Page</h2>
      {isCreating ? (
        <form>
          <label>Expressway:</label>
          <input type="text" name="expressway" value={formData.expressway} onChange={handleInputChange} />
          <label>Entry:</label>
          <input type="text" name="entry" value={formData.entry} onChange={handleInputChange} />
          <label>Exit:</label>
          <input type="text" name="exit" value={formData.exit} onChange={handleInputChange} />
          {/* Add similar input fields for other data properties */}
          <button type="button" onClick={handleAddData}>
            Add Data
          </button>
          <button type="button" onClick={() => setIsCreating(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setIsCreating(true)}>
          Create/Add Data
        </button>
      )}

      {/* Display toll gate data in a table */}
      <table>
        <thead>
          <tr>
            <th>Expressway</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Vehicle Class</th>
            <th>Vehicle</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tollGateData.map((data) => (
            <tr key={data._id}>
              <td>{data.expressway}</td>
              <td>{data.entry}</td>
              <td>{data.exit}</td>
              <td>{data.vehicleClass}</td>
              <td>{data.vehicle}</td>
              <td>{data.price}</td>
              <td>
                <button onClick={() => handleEdit(data._id)}>Edit</button>
                <button onClick={() => handleDelete(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
