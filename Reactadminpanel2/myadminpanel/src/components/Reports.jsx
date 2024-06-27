// src/components/Reports.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const response = await axios.get('http://localhost:5000/api/reports');
    setReports(response.data);
  };

  const addReport = async () => {
    const newReport = { title, description };
    await axios.post('http://localhost:5000/api/reports', newReport);
    fetchReports();  // Refresh the report list
    setTitle('');
    setDescription('');
  };

  const deleteReport = async (id) => {
    await axios.delete(`http://localhost:5000/api/reports/${id}`);
    fetchReports();  // Refresh the report list
  };

  const updateReport = async (id) => {
    const updatedReport = { title, description };
    await axios.put(`http://localhost:5000/api/reports/${id}`, updatedReport);
    fetchReports();  // Refresh the report list
  };

  return (
    <div className="reports-container">
      <div className="reports-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={addReport}>Add Report</button>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report._id}>
              <td>{report.title}</td>
              <td>{report.description}</td>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td className="reports-actions">
                <button className="edit-btn" onClick={() => updateReport(report._id)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteReport(report._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
