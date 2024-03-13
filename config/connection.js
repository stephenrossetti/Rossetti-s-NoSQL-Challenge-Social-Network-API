// Establish connection to MongoDB database //
// Connect: connect to MongoDB database //
// Connection: connect to MongoDB server //
const { connect, connection } = require('mongoose');

// Default address for server to run and call database socialNetworkDB // 
const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

// Connect to connectionString //
connect(connectionString);

module.exports = connection;
