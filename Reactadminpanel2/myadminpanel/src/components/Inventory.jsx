import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    const response = await axios.get('http://localhost:5000/api/inventory');
    setInventoryItems(response.data);
  };

  const addInventoryItem = async () => {
    const newInventoryItem = { name, quantity, location };
    await axios.post('http://localhost:5000/api/inventory', newInventoryItem);
    fetchInventoryItems();  // Refresh the inventory list
    setName('');
    setQuantity('');
    setLocation('');
  };

  const deleteInventoryItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/inventory/${id}`);
    fetchInventoryItems();  // Refresh the inventory list
  };

  const updateInventoryItem = async (id) => {
    const updatedInventoryItem = { name, quantity, location };
    await axios.put(`http://localhost:5000/api/inventory/${id}`, updatedInventoryItem);
    fetchInventoryItems();  // Refresh the inventory list
  };

  return (
    <div className="inventory-container">
      <div className="inventory-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={addInventoryItem}>Add Inventory Item</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
              <td className="inventory-actions">
                <button className="edit-btn" onClick={() => updateInventoryItem(item._id)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteInventoryItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
