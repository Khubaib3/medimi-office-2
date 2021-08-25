import { isEmpty } from "lodash";
// import localforage from 'localforage'
import api from "../../services/api";

const state = {
  loggedInUser: null,
  loginCredentials: null,
  hospital: null
};

const mutations = {
  SET_LOGGED_IN_USER(state, payload) {
    state.loggedInUser = payload;
  },

  SET_LOGIN_CREDENTIALS(state, payload) {
    state.loginCredentials = payload;
  },
  SET_HOSPITAL(state, payload) {
    state.hospital = payload
  }
};

const actions = {


  async login({ state, commit }, payload) {
    commit("SET_LOGIN_CREDENTIALS", payload);
    try {
      const result = await api.post('/user/login', state.loginCredentials)
      if(!result) return Promise.reject("Error in login")
      localStorage.setItem("authToken", result.data.result.token)
      commit("SET_LOGGED_IN_USER", result.data.result.userData)
      return Promise.resolve(state.loggedInUser)
    } catch (error) {
      return error
    }
  },

  async checkAuthToken({ state, commit }) {
    try {
      let token = localStorage.getItem('authToken')
      
      const result = await api.get(`/user/checkAuth/${token}`)
      if(!result) return Promise.reject("Error in login")
      commit("SET_LOGGED_IN_USER", result.data.result.userData)
      return Promise.resolve(result.data.result.userData)
    } catch (error) {
      return error
    }
  }



};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
