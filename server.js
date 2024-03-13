// Require express and import connection and routes //
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up environment/port //
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse data //
// Use routes from route.js //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to MongoDB and start server on port //
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
