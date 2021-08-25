import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import hospital from './modules/hospital'
import department from './modules/department'
import appointment from './modules/appointment'
import patient from './modules/patient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    hospital,
    department,
    appointment,
    patient
  }
})
