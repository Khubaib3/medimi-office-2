import { isEmpty } from "lodash";
// import localforage from 'localforage'
import api from "../../services/api";

const state = {
  hospital: null
};

const mutations = {
  SET_HOSPITAL(state, payload) {
    state.hospital = payload
  }
};

const actions = {


  async getHospital({ state, commit, rootState }) {
    try {
      const hospital = await api.get(`/hospital/${rootState.auth.loggedInUser.hospitalId}`)
      if(!hospital) return Promise.reject("Error in getting hospital Data")
      commit("SET_HOSPITAL", hospital.data.result)
      return Promise.resolve(data)
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
