// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');
const sequelize = require('./config/db');

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Home route for testing
app.get('/', (req, res) => {
  res.send('Welcome to HNG STAGE TWO TASK - User Authentication & Organisation');
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Error 404, route not fount'
  });
});



// Routes
app.use(authRoutes);
app.use(orgRoutes);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Error connecting to the database', err);
  });


// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
