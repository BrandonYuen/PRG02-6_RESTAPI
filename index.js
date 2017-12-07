const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Express App
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Portfolio');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// accept header middleware
app.use(function(req, res, next){

	// if not a json request, send error
	if (!req.accepts('application/json')) {
		res.status(406).send( {message: 'unsupported format requested: '+req.get("accept")} );
	}else {
		next();
	}
});

// initialise routes
app.use('/api', require('./routes/api.js'));

// error handling middleware
app.use(function(err, req, res, next){
	// console.log(err);
	res.status(422).send( {error: err.message} );
});

//Listen for requests
app.listen(process.env.port || 80, function(){
	console.log("Now listening for requests.");
});
