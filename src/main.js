import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/font/font.css'
import store from './store/store.js'
import './assets/material-icons.css'

import Toast from 'muse-ui-toast';

import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';

import 'muse-ui-loading/dist/muse-ui-loading.css';
import Loading from 'muse-ui-loading';

import 'muse-ui-progress/dist/muse-ui-progress.css';
import NProgress from 'muse-ui-progress';

Vue.use(MuseUI)

const ToastOption = {
  position: 'top', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: false, // 是否显示关闭按钮
  errorIcon: '' // 错误信息图标
}
Vue.use(Toast, ToastOption);


Vue.use(Message);
Vue.use(Loading);
Vue.use(NProgress);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
