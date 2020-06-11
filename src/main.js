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
import Teams from './components/Teams_Component.vue';
import Team from './components/Team_Component.vue';
import Match from './components/Match_Component.vue';
import ScoutingApp from './components/ScoutingApp_Component.vue';

const routes = [
  {
      // Main landing page with access to each competition
      name: 'home',
      path: '',
      component: Home,
      meta: {
        title: '2019 Scouting App'
      }
  },
  {
    // Competition page displaying all attending team averages
    name: 'teams',
    path: '/teams::competition?',
    component: Teams,
    meta: {
      title: 'Teams'
    }    
  },
  {
    // Competition page displaying all matches for a specific team
    name: 'team',
    path: '/team::competition?::team?',
    component: Team,
    meta: {
      title: 'Team'
    }
  },
  {
    // Competition page displaying all data from a specific match
    name: 'match',
    path: '/match::competition?::match?',
    component: Match,
    meta: {
      title: 'Match'
    }
  },
  {
    // Scouting page to gather information for a team at a match at a competition
    name: 'scouting',
    path: '/scouting::competition?',
    component: ScoutingApp,
    meta: {
      title: 'Scouting App'
    }
  }
];

/* eslint-disable */
const router = new VueRouter({ mode: 'history', routes: routes});
router.afterEach((to, from, next) => {
  document.title = to.meta.title || '2019 Scouting App';
});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');