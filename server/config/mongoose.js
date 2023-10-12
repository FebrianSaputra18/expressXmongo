const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb://root:root@localhost:27017/productsMongoose?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to Mongoose database');
});