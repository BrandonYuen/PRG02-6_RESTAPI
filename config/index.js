var env = process.env.NODE_ENV || 'production'
var cfg = require('./config.'+env);

module.exports = cfg;
