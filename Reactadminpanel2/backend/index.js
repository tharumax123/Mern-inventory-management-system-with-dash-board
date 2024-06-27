// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

 
// Product model
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  category: String,
  price: String
}));

// Category model
const Category = require('./models/Category');

const Customer = require('./models/Customer');

// Inventory schema and model
const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  location: String
});

//Reports schema model

const Report = require('./models/Report');
const Inventory = mongoose.model('Inventory', inventorySchema);


// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.send({ message: 'User created', user });
  } catch (err) {
    res.status(400).send({ message: 'Error creating user', error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err.message });
  }
});

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Example of a protected route
app.get('/api/protected', auth, (req, res) => {
  res.send('This is a protected route');
});


// Product routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.put('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(product);
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: 'Product deleted' });
});

// Category routes
app.get('/api/categories', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

app.post('/api/categories', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.send(category);
});

app.put('/api/categories/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(category);
});

app.delete('/api/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.send({ message: 'Category deleted' });
});
// Customer routes//

app.get('/api/customers', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

app.post('/api/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.send(customer);
});

app.put('/api/customers/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(customer);
});

app.delete('/api/customers/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.send({ message: 'Customer deleted' });
});
// Inventory routes

app.get('/api/inventory', async (req, res) => {
  const inventoryItems = await Inventory.find();
  res.send(inventoryItems);
});

app.post('/api/inventory', async (req, res) => {
  const inventoryItem = new Inventory(req.body);
  await inventoryItem.save();
  res.send(inventoryItem);
});

app.put('/api/inventory/:id', async (req, res) => {
  const inventoryItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(inventoryItem);
});

app.delete('/api/inventory/:id', async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.send({ message: 'Inventory item deleted' });
});

//Reports route

// Get all reports
app.get('/api/reports', async (req, res) => {
  const reports = await Report.find();
  res.send(reports);
});

// Add a new report
app.post('/api/reports', async (req, res) => {
  const report = new Report(req.body);
  await report.save();
  res.send(report);
});

// Update a report
app.put('/api/reports/:id', async (req, res) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(report);
});

// Delete a report
app.delete('/api/reports/:id', async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.send({ message: 'Report deleted' });
});


// signup routes
app.get('/api/products/total', async (req, res) => {
  const totalProducts = await Product.countDocuments();
  res.send({ total: totalProducts });
});

app.get('/api/categories/total', async (req, res) => {
  const totalCategories = await Category.countDocuments();
  res.send({ total: totalCategories });
});

app.get('/api/customers/total', async (req, res) => {
  const totalCustomers = await Customer.countDocuments();
  res.send({ total: totalCustomers });
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    res.send({ message: 'User created', user });
  } catch (err) {
    res.status(400).send({ message: 'Error creating user', error: err.message });
  }
});
//login routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.send({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err.message });
  }
});
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
