<template>
	<div>
		<h1> {{project._id}} </h1>
		<div class="row">
			<div class="col-md-10"></div>
			<div class="col-md-2"><router-link :to="{ name: 'ListProject' }" class="btn btn-success">Return to Projects</router-link></div>
		</div>

		<form>
			<div class="form-group">
				<label>Project Name</label>
				<div type="text"> {{project.name}} </div>
			</div>

			<div class="form-group">
				<label name="project_description">Project Description</label>
				<div type="text"> {{project.desc}} </div>
			</div>

			<div class="form-group">
				<label name="project_description">Project Status</label>
				<div type="text"> {{project.status}} </div>
			</div>

			<div class="form-group">
				<router-link :to="{name: 'EditProject', params: { id: project._id }}" class="btn btn-primary">Edit Project</router-link>
			</div>
		</form>
	</div>
</template>

<script>
	import config from '../../config'
	export default{
		data(){
			return{
				project:{}
			}
		},

		created: function(){
			this.getProject();
		},

		methods: {
			getProject()
			{
				let uri = 'http://www.'+config.hostname+'/api/projects/' + this.$route.params.id;
				this.axios.get(uri).then((response) => {
					this.project = response.data;
				});
			}
		}
	}
</script>
