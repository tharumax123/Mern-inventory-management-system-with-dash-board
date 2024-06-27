// backend/models/Customer.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
