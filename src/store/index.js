import Vue from 'vue';
import Vuex from 'vuex';
import Http from '@/libs/Http'
import qs from 'qs'

Vue.use(Vuex);

const state = {
  id: null,
  username: '',
  favorites: null,
  storeList: null,
};

const mutations = {
  setState(state, params) {
    for (let key of Object.keys(params)) {
      state[key] = params[key];
    }
  },
};

const actions = {
  getUser: async function ({ commit, state }, user_id) {
    const params = {
      user_id
    };
    await Http.get('/user', {params}).then((res) => {
      const data = res.data.data;
      commit('setState', {
        id: data.user_id,
        username: data.name,
        favorites: data.favorite_list,
      })
    })
  },
  getStoreListKeyword: async function ({ commit, state }, keyword) {
    const params = {
      keyword
    };
    await Http.get('/store/list/keyword', {params}).then((res) => {
      const storeList = res.data.data;
      commit('setState', {
        storeList
      });
    });
  },
  getStoreListTag: async function ({ commit, state }, tag) {
    const params = {
      tag
    };
    await Http.get('/store/list/tag', { params }).then((res) => {
      const storeList = res.data.data;
      commit('setState', {
        storeList
      });
    });
  },
  getFavorites: async function ({ commit, state }, user_id) {
    const params = {
      user_id
    };
    await Http.get('/user/favorite', { params }).then((res) => {
      const favorites = res.data.data;
      commit('setState', {
        favorites
      });
    });
  },
  addFavorite: function ({ commit, state, dispatch }, params) {
    Http.post('/user/favorite', qs.stringify(params)).then((res) => {
      dispatch('getFavorites', params.user_id);
    });
  },
  deleteFavorite: function ({ commit, state, dispatch }, params) {
    Http.delete('/user/favorite', {params}).then((res) => {
      dispatch('getFavorites', params.user_id);
    });
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
});
