<template>
	<div>
		<h1>Projects</h1>

		<div class="row">
			<div class="col-md-10"></div>
			<div class="col-md-2">
				<router-link :to="{ name: 'CreateProject' }" class="btn btn-primary">Create Project</router-link>
			</div>
		</div><br />

		<table class="table table-hover">
			<thead>
				<tr>
					<td><b>ID</b></td>
					<td><b>Project Name</b></td>
					<td><b>Status</b></td>
				</tr>
			</thead>

			<tbody>
				<tr v-for="project in projects.items">
					<td>{{ project._id }}</td>
					<td>{{ project.name }}</td>
					<td>{{ project.status }}</td>
					<td><router-link :to="{name: 'EditProject', params: { id: project._id }}" class="btn btn-primary">Edit</router-link></td>
					<td><router-link :to="{name: 'DetailProject', params: { id: project._id }}" class="btn btn-primary">Detail</router-link></td>
					<td><button class="btn btn-danger" v-on:click="deleteProject(project._id)">Delete</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import config from '../../config'
	export default {
		data(){
			return{
				projects: []
			}
		},

		created: function()
		{
			this.fetchProjects();
		},

		methods: {
			fetchProjects()
			{
				let uri = 'http://www.'+config.hostname+'/api/projects';
				this.axios.get(uri).then((response) => {
					this.projects = response.data;
				});
			},
			deleteProject(id)
			{
				let uri = 'http://www.'+config.hostname+'/api/projects/' + id;
				this.axios.delete(uri);

				// Delete project item from list
				for (var i=0; i<this.projects.items.length; i++){
					if (this.projects.items[i]._id == id){
						this.projects.items.splice(i, 1);
					}
				}
			}
		}
	}
</script>
