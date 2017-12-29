const { orderedFor } = require('./utils/orderedFor');
module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor,
};
