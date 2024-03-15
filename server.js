// Require express and import connection and routes //
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cwd = process.cwd();

// Set up environment/port //
const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('Challenge-')
  ? cwd.split('Challenge-')[1]
  : cwd;

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
