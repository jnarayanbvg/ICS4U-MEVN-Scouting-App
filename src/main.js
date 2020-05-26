import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;


//Establish all routes with components
import Home from './components/Home_Component.vue';
import ScoutingApp from './components/ScoutingApp_Component.vue';

const routes = [
  {
      name: 'home',
      path: '',
      component: Home
  },
  {
    name: 'scouting',
    path: '/scouting::competition?',
    component: ScoutingApp
  }
];


const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');