import { createStore } from 'vuex'
import { loginRequest } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    user: JSON.parse(localStorage.getItem('userData') || null)
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    fio: (state) => state.user.fio || '',
    email: (state) => state.user.email || '',
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
            .then((token) => {
              commit('AUTH_SUCCESS', token);
              localStorage.setItem('myAppToken', token);
              resolve();
            })
            .catch(() => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject();
            });
      });
    },
  },
  modules: {
  }
})
