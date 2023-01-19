const app = require('./app');
const mongoose = require('mongoose');

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

mongoose.connect('mongodb://localhost/issue_tracker');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', () => {
  console.log('Connected to Database :: MongoDB ✅');
});

module.exports = db;
