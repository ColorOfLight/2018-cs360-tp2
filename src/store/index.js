import Vue from 'vue';
import Vuex from 'vuex';
import Http from '@/libs/Http'

Vue.use(Vuex);

const state = {
  id: null,
  username: '',
  favorites: [],
};

const mutations = {
  setState(state, params) {
    for (let key of Object.keys(params)) {
      state[key] = params[key];
    }
  },
};

const actions = {
  getUser ({ commit, state }, user_id) {
    const params = {
      user_id
    };
    Http.get('/user', {params}).then((res) => {
      const data = res.data.data;
      commit('setState', {
        id: data.user_id,
        username: data.name,
        favorites: data.favorite_list,
      })
    })
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
});
