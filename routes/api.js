const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');

// get a list of projects from db
router.get('/projects', function(req, res, next){
	Project.find({}).then(function(projects){
		res.send(projects);
	})
});

// add new project to db
router.post('/projects', function(req, res, next){
	Project.create(req.body).then(function(project){
		res.send(project);
	}).catch(next);
});

// update project in db
router.put('/projects/:id', function(req, res, next){
	Project.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Project.findOne({_id: req.params.id}).then(function(project){
			res.send(project);
		});
	});
});

// delete project from db
router.delete('/projects/:id', function(req, res, next){
	Project.findByIdAndRemove({_id: req.params.id}).then(function(project){
		res.send(project);
	});
});

// options for collection
router.options('/projects', function(req, res, next){
	res.header('Allow', 'GET,POST,OPTIONS');
	res.send(200);
});

// options for detail resource
router.options('/projects/:id', function(req, res, next){
	res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
	res.send(200);
});

module.exports = router;
