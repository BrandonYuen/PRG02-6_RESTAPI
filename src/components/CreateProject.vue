<template>
	<div>
		<h1>Create An Project</h1>
		<form v-on:submit.prevent="addProject">

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Project Name:</label>
						<input type="text" class="form-control col-md-6" v-model="project.name" />
					</div>
				</div>
			</div><br>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Project Description:</label>
						<input type="text" class="form-control col-md-6" v-model="project.desc" />
					</div>
				</div>
			</div><br>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Project Status:</label>
						<input type="text" class="form-control col-md-6" v-model="project.status" />
					</div>
				</div>
			</div><br />

			<div class="form-group">
				<button class="btn btn-primary">Add Project</button>
			</div>

		</form>
	</div>
</template>

<script>
	import config from '../../config'
	export default {
		data(){
			return{
				project:{}
			}
		},
		methods: {
			addProject(){
				let uri = 'http://www.'+config.hostname+'/api/projects/';
				this.axios.post(uri, this.project).then((response) => {
					this.$router.push({name: 'ListProject'})
				})
			}
		}
	}
</script>
