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


  async addPatientByStaff({ state, commit }, payload) {
    commit("SET_BODY", payload);
    try {
      const result = await api.post('/patient/addPatientByStaff', state.body)
      if(!result) return Promise.reject("Error in adding Patient")
      return Promise.resolve(result.data.result)
    } catch (error) {
      return error
    }
  },

  async searchById({ state, commit }, payload) {
    try {
      commit("SET_ID", payload.id)
      let tmpId = state.id.split('P')
      const result = await api.get(`/patient/${tmpId[1]}`)
      if(!result) return Promise.reject("Error in finding Patient")
      return Promise.resolve(result.data.result)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async getDepartmentPatients({ state, commit }, payload) {
    try {
      commit("SET_ID", payload.id)
      const response = await api.get(`/patient/department/${payload.id}`)
      if(!response) return Promise.reject("Error in finding Patient")
      return Promise.resolve(response.data.result)
    } catch (error) {
      return Promise.reject(error)
    }
  },




};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
