import { isEmpty } from "lodash";
// import localforage from 'localforage'
import api from "../../services/api";

const state = {
  body: null,
  id: null
};

const mutations = {
  SET_BODY(state, payload) {
    state.body = payload;
  },

  SET_ID(state, payload) {
    state.id = payload;
  },

};

const actions = {


  async addAppointment({ state, commit }, payload) {
    commit("SET_BODY", payload);
    try {
      const result = await api.post('/appointment/', state.body)
      if(!result) return Promise.reject("Error in adding appointment")
      return Promise.resolve(result.data.result)
    } catch (error) {
      return error
    }
  },

  async getAppointmentRange({ state, commit }, payload) {
    try {
      const response = await api.get(`appointment/range/${payload.id}/${payload.start}/${payload.end}`)
      if(!response) return Promise.reject("Error in getting appointment")
      return Promise.resolve(response.data.result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  
  async getAppointmentsByDepartment({ state, commit }, payload) {
    try {
      const response = await api.get(`/appointment/department/${payload.id}`)
      if(!response) return Promise.reject("Error in getting appointment")
      return Promise.resolve(response.data.result)
    } catch (error) {
      return error
    }
  },

  async getAppointment({ state, commit }, payload) {
    try {
      const response = await api.get(`/appointment/${payload.id}`)
      if(!response) return Promise.reject("Error in getting appointment")
      return Promise.resolve(response.data.result)
    } catch (error) {
      return error
    }
  },


};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
