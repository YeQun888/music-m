import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    newslist:[]
  },
  actions: {
    newJson(obj) {
      obj.commit('getJson');
    }
  },
  mutations: {
    getJson() {
      Vue.http.get('../data.json', {
      }, {
          headers: {},
          emulateJSON: true
        }).then(response => {
          this.state.newslist = response.data;
        }, response => {

        })
    }
  }
})
