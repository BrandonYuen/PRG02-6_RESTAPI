
import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import CreateProject from './components/CreateProject.vue';
import ListProject from './components/ListProject.vue';
import EditProject from './components/EditProject.vue';
import DetailProject from './components/DetailProject.vue';

const routes = [
	{
		name: 'CreateProject',
		path: '/create/project',
		component: CreateProject
	},
	{
		name: 'ListProject',
		path: '/',
		component: ListProject
	},
	{
		name: 'EditProject',
		path: '/edit/:id',
		component: EditProject
	},
	{
		name: 'DetailProject',
		path: '/detail/:id',
		component: DetailProject
	}
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
