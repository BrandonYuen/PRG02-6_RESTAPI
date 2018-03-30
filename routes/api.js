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
router.put('/projects/:id', projectController.updateProject);

// delete project from db
router.delete('/projects/:id', projectController.deleteProject);

// options for collection
router.options('/projects', function(req, res, next){
	res.header('Allow', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.sendStatus(200);
});

// options for detail resource
router.options('/projects/:id', function(req, res, next){
	res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.sendStatus(200);
});

module.exports = router;
