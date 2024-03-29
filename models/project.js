const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create project Schema & model
const ProjectSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	desc: {
		type: String,
		required: [true, 'Desc field is required']
	},
	status: {
		type: String,
		required: [true, 'Status field is required']
	}
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
