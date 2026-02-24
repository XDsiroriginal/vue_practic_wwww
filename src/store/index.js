import { createStore } from 'vuex'
import { loginRequest, getUserData } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    user: JSON.parse(localStorage.getItem('userData') || 'null')
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    fio: (state) => state.user?.fio || state.user?.name || 'Гость',
    email: (state) => state.user?.email || '',
  },
  mutations: {
    AUTH_SUCCESS: (state, payload) => {
      state.token = payload.token;
      state.user = payload.user;

      localStorage.setItem('myAppToken', payload.token);
      if (payload.user) {
        localStorage.setItem('userData', JSON.stringify(payload.user));
      }
    },
    AUTH_ERROR: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('myAppToken');
      localStorage.removeItem('userData');
    },
  },
  actions: {
    async AUTH_REQUEST({ commit }, user) {
      try {
        const token = await loginRequest(user);

        const userData = await getUserData(token);

        commit('AUTH_SUCCESS', { token, user: userData });
        return Promise.resolve();
      } catch (error) {
        commit('AUTH_ERROR');
        return Promise.reject(error);
      }
    },
  },
  modules: {}
})