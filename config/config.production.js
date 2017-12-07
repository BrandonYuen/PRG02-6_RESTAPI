// Load default config
var config = require('./config.development');

// Update new config settings
config.env = 'production';
config.hostname = 'brandonyuen.nl';

module.exports = config;
