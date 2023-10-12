const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  status: Boolean,
  image: String, // Store the image filename here
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
