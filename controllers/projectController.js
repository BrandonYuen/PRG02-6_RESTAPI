const config = require('../config');
const Project = require('../models/project.js');

// Require pagination helper
var pagination = require('../helpers/paginationHelper');

// get list of all Projects
exports.getList = function(req, res, next) {

	// Get total amount of projects
	Project.count({})
	.lean()
	.then(function(count) {

		totalItems = count;

		Project.find({})
		.lean()
		.skip(parseInt(req.query.start)-1)
	    .limit(parseInt(req.query.limit))
		.then(function(projects) {

			// Modify returned list of projects
			for (i in projects) {

				// Add links
				// TODO: Make helper function
				projects[i]['_links'] = {
					self: {
						href: 'http://www.'+config.hostname+'/api/projects/'+projects[i]._id
					},
					collection: {
						href: 'http://www.'+config.hostname+'/api/projects'
					}
				};

				// Only show 'collection list' data (remove detail resource only details)
				projects[i]['desc'] = undefined;
			}

			// Set pagination properties
			var currentPage = pagination.currentPage(totalItems, req.query.start, req.query.limit);
			var totalPages = pagination.numberOfPages(totalItems, req.query.start, req.query.limit);
			var currentItems = pagination.currentItems(totalItems, req.query.start, req.query.limit);

			// Set pagination _links of current query
			var firstPage = 1;
			var lastPage = totalPages;
			var previousPage = currentPage - 1;
			if (previousPage < 1) {
				previousPage = 1;
			}
			var nextPage = currentPage + 1;
			if (nextPage > totalPages) {
				nextPage = totalPages;
			}

			var firstPageQueryString = pagination.getFirstQueryString(totalItems, req.query.start, req.query.limit);
			var lastPageQueryString = pagination.getLastQueryString(totalItems, req.query.start, req.query.limit);
			var previousPageQueryString = pagination.getPreviousQueryString(totalItems, req.query.start, req.query.limit);
			var nextPageQueryString = pagination.getNextQueryString(totalItems, req.query.start, req.query.limit);

			res.send(
				{
					items: projects,
					_links: {
						self: {
							href: 'http://www.'+config.hostname+'/api/projects/'
						}
					},
					pagination: { //TODO: Create helper for pagination
						currentPage: currentPage,
						currentItems: currentItems,
						totalPages: totalPages,
						totalItems: totalItems,
						_links: {
							first: {
								page: firstPage,
								href: 'http://www.'+config.hostname+'/api/projects/'+firstPageQueryString
							},
							last: {
								page: lastPage,
								href: 'http://www.'+config.hostname+'/api/projects/'+lastPageQueryString
							},
							previous: {
								page: previousPage,
								href: 'http://www.'+config.hostname+'/api/projects/'+previousPageQueryString
							},
							next: {
								page: nextPage,
								href: 'http://www.'+config.hostname+'/api/projects/'+nextPageQueryString
							}
						}
					}
				}
			);
		})//.catch(next);
	})//.catch(next);
};

// get detail resource of single project
exports.getById = function(req, res, next) {
	Project.findOne({_id: req.params.id}).lean().then(function(project){

		// Add links to project
		// TODO: Make helper function
		project['_links'] = {
			self: {
				href: 'http://www.'+config.hostname+'/api/projects/'+project._id
			},
			collection: {
				href: 'http://www.'+config.hostname+'/api/projects'
			}
		};

		res.send(project);
	}).catch(next);;
};

// get detail resource of single project
exports.createProject = function(req, res, next) {
	Project.create(req.body).then(function(project){
		res.status(201).send(project);
	}).catch(next);
};

// update project in db
exports.updateProject = function(req, res, next) {
	// If body is empty
	if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
		res.status(400).send({ error: 'Cannot update resource with empty body'});
		return;
	}

	Project.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true}).then(function(){
		Project.findOne({_id: req.params.id}).then(function(project){
			res.send(project);
		}).catch(next);;
	}).catch(next);
};

// delete project from db
exports.deleteProject = function(req, res, next) {
	Project.findByIdAndRemove({_id: req.params.id}).then(function(project){
		res.sendStatus(204);
	}).catch(next);;
};
