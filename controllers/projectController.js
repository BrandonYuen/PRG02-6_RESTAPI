const config = require('../config');
const Project = require('../models/project.js');

// get list of all Projects
exports.getList = function(req, res) {

	Project.find({}).lean().then(function(projects) {

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
			projects[i]['status'] = undefined;
		}

		res.send(
			{
				items: projects,
				_links: {
					self: {
						href: 'http://www.'+config.hostname+'/api/projects'
					}
				},
				pagination: { //TODO: Create helper for pagination
					currentPage: 0,
					currentItems: 0,
					totalPages: 0,
					totalItems: 0,
					_links: {
						first: {
							page: 0,
							href: "test"
						},
						last: {
							page: 0,
							href: "test"
						},
						previous: {
							page: 0,
							href: "test"
						},
						next: {
							page: 0,
							href: "test"
						}
					}
				}
			}
		);
	})
};


// get detail resource of single project
exports.getById = function(req, res) {
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
	});
};
