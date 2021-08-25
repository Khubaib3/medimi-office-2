import { isEmpty } from "lodash";
// import localforage from 'localforage'
import api from "../../services/api";

const state = {
  departments: [],
  departmentHeads: [],
  secretaries: [],
  doctors: [],
  id: null
};

const mutations = {
  SET_DEPARTMENTS(state, payload) {
    state.departments = payload
  },

  PUSH_NEW_DEPARTMENT(state, payload) {
    state.departments.push(payload)
  },

  REMOVE_DEPARTMENT(state, payload) {
    let index = state.departments.findIndex(obj => obj.id == payload)
    state.departments.splice(index, 1)
  },

  SET_HEADS(state, payload) {
    state.departmentHeads = payload
  },

  SET_SECRETARIES(state, payload) {
    state.secretaries = payload
  },

  SET_DOCTORS(state, payload) {
    state.doctors = payload
  },

  SET_ID(state, payload) {
    state.id = payload
  }
};

const actions = {

  async getDepartmentHeads({ state, commit, rootState}, payload) {
    try {
      const department = await api.get(`/departmentHead/${rootState.hospital.hospital.id}/${payload}`)
      if(!department) return Promise.reject("Error in getting department head")
      commit("SET_HEADS", department.data.result)
      return Promise.resolve(true)
    } catch (error) {
      return error
    }
  },

  async getDepartmentHead({ state, commit }, payload) {
    try {
      const department = await api.get(`/departmentHead/${payload.id}`)
      if(!department) return Promise.reject("Error in getting department head")
      return Promise.resolve(department.data.result)
    } catch (error) {
      return error
    }
  },

  async getDepartmentSecretaries({ state, commit, rootState}, payload) {
    try {
      const department = await api.get(`/secretary/${rootState.hospital.hospital.id}/${payload}`)
      if(!department) return Promise.reject("Error in getting department head")
      commit("SET_SECRETARIES", department.data.result)
      return Promise.resolve(true)
    } catch (error) {
      return error
    }
  },

  async getDepartmentSecretary({ state, commit, rootState}, payload) {
    try {
      const department = await api.get(`/secretary/${payload.id}`)
      if(!department) return Promise.reject("Error in getting department head")
      return Promise.resolve(department.data.result)
    } catch (error) {
      return error
    }
  },

  async getDepartmentDoctors({ state, commit, rootState}, payload) {
    try {
      const department = await api.get(`/doctor/${rootState.hospital.hospital.id}/${payload}`)
      if(!department) return Promise.reject("Error in getting department head")
      commit("SET_DOCTORS", department.data.result)
      return Promise.resolve(department.data.result)
    } catch (error) {
      return error
    }
  },

  async getDepartmentDoctor({ state, commit, rootState}, payload) {
    try {
      const department = await api.get(`/doctor/${rootState.hospital.hospital.id}/${payload.departmentId}/${doctorId}`)
      if(!department) return Promise.reject("Error in getting department head")
      return Promise.resolve(department.data.result)
    } catch (error) {
      return error
    }
  },
  


  async getDepartments({ state, commit, rootState }) {
    try {
      const departments = await api.get(`/department/${rootState.hospital.hospital.id}/dep/`)
      if(!departments) return Promise.reject("Error in getting department Data")
      commit("SET_DEPARTMENTS", departments.data.result)
      return Promise.resolve(state.departments)
    } catch (error) {
      return error
    }
  },

  async createNewDepartment({ state, commit, rootState}, payload) {
    try {
      const department = await api.post(`/department/${rootState.hospital.hospital.id}/dep/`, payload)
      if(!department) return Promise.reject("Error in creating department")
      commit("PUSH_NEW_DEPARTMENT", department.data.result)
      return Promise.resolve(department.data.result)
    } catch (error) {
      return error
    }
  },

  async deleteDepartment({ state, commit, rootState}, payload) {
    try {
      const department = await api.delete(`/department/${rootState.hospital.hospital.id}/dep/${payload}`)
      if(!department) return Promise.reject("Error in deleting department")
      commit("REMOVE_DEPARTMENT", payload)
      return Promise.resolve(true)
    } catch (error) {
      return error
    }
  },


  async editDepartment({ state, commit, rootState}, payload) {
    try {
      const { id, data } = payload 
      const department = await api.put(`/department/${rootState.hospital.hospital.id}/dep/${id}`, data)
      if(!department) return Promise.reject("Error in deleting department")
      commit("REMOVE_DEPARTMENT", id)
      console.log(department.data.result)
      commit("PUSH_NEW_DEPARTMENT", department.data.result)
      return Promise.resolve(true)
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
