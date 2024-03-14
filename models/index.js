// Import all the models into one location and export //
// We don't need the Reaction schema since it is not it's own model and is imported into the Thought model already //
const Thought = require('./thought');
const User = require('./user')

module.exports = { Thought, User };