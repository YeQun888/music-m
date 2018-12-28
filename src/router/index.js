import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('../components/login')), 'login');
const home = r => require.ensure([], () => r(require('../components/home')), 'home');
const songDetails = r => require.ensure([], () => r(require('../components/songDetails')), 'songDetails');
const play = r => require.ensure([], () => r(require('../components/play')), 'play');

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/songDetails',
      component: songDetails
    },
    {
      path: '/play',
      component: play
    },
  ]
})
