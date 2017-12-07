var config = module.exports = {};

// general
config.env = 'development';
config.hostname = 'localhost';

// mongo db
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'Portfolio';
