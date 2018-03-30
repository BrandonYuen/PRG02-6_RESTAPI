const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create project Schema & model
const ProjectSchema = new Schema({
	name: {
		type: String,
		minlength: 2,
		required: [true, 'Name field is required']
	},
	desc: {
		type: String,
		minlength: 2,
		required: [true, 'Desc field is required']
	},
	status: {
		type: String,
		minlength: 2,
		required: [true, 'Status field is required']
	}
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
