// src/components/Categories.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categoriesData.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categoriesData]);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/categories');
    setCategoriesData(response.data);
    setFilteredCategories(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/categories/${currentCategory._id}`, newCategory);
      setIsEditing(false);
    } else {
      await axios.post('http://localhost:5000/api/categories', newCategory);
    }
    setNewCategory({ name: '', description: '' });
    fetchCategories();
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setNewCategory(category);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    fetchCategories();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <form onSubmit={handleSubmit} className="add-category-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCategory.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCategory.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update Category' : 'Add Category'}</button>
      </form>

      <table className="categories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
