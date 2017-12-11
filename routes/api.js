const config = require('../config');
const express = require('express');
const router = express.Router();

// Require controller modules
var projectController = require('../controllers/projectController');

// get a list of projects from db
router.get('/projects', projectController.getList);

// add new project to db
router.post('/projects', projectController.createProject);

// get detail resource project from db
router.get('/projects/:id', projectController.getById);

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
	res.sendStatus(200);
});

// options for detail resource
router.options('/projects/:id', function(req, res, next){
	res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
	res.sendStatus(200);
});

module.exports = router;
