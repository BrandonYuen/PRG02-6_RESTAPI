<template>
	<div>
		<h1>Update Project: {{project._id}}</h1>
		<div class="row">
			<div class="col-md-10"></div>
			<div class="col-md-2"><router-link :to="{ name: 'ListProject' }" class="btn btn-success">Return to Projects</router-link></div>
		</div>

		<form v-on:submit.prevent="updateProject">
			<div class="form-group">
				<label>Project Name</label>
				<input type="text" class="form-control" v-model="project.name">
			</div>

			<div class="form-group">
				<label name="project_description">Project Description</label>
				<input type="text" class="form-control" v-model="project.desc">
			</div>

			<div class="form-group">
				<label name="project_description">Project Status</label>
				<input type="text" class="form-control" v-model="project.status">
			</div>

			<div class="form-group">
				<button class="btn btn-primary">Update</button>
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
			},

			updateProject()
			{
				let uri = 'http://www.'+config.hostname+'/api/projects/' + this.$route.params.id;
				this.axios.put(uri, this.project).then((response) => {
					this.$router.push({name: 'ListProject'});
				});
			}
		}
	}
</script>
