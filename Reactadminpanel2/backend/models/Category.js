// backend/models/Category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
