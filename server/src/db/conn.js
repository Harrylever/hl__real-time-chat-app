const { connect } = require('mongoose');
const { mongoUri } = require('../config/const');

module.exports = connect(mongoUri)
  .then(() => console.log('connected to database 🚀'))
  .catch((err) => console.log(`MongoDB connection failed: ${err.message}`));
