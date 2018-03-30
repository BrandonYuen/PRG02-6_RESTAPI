const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Express App
const app = express();

// Load config
const config = require('./config');

// Connect to MongoDB
mongoose.connect('mongodb://'+config.mongo.uri+'/'+config.mongo.db);
mongoose.Promise = global.Promise;

// support json encoded bodies
app.use(bodyParser.json());
// support (other) encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// accept header middleware
app.use(function(req, res, next){
	// if not a json request, send error
	if (!req.accepts('application/json')) {
		res.status(406).send( {message: 'unsupported format requested: '+req.get("accept")} );
	}else {
		next();
	}
});

// Access Controll middleware
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// static directory for client files
app.use('/dist', express.static(path.join(__dirname, 'dist')))

// initialise routes for api
app.use('/api', require('./routes/api.js'));

// initialise routes for portfolio website
app.use('/', require('./routes/index.js'));

// error handling middleware
app.use(function(err, req, res, next){
	// console.log(err);
	res.status(422).send( {error: err.message} );
});

//Listen for requests
app.listen(process.env.port || 80, function(){
	console.log("Now listening for requests.");
});
