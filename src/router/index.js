import Vue from 'vue'
import Router from 'vue-router'
import { theRoutes } from './routes.js';


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: theRoutes
})
