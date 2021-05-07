/*
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-12 13:44:15
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 17:34:40
 */
import { getUnitList, addUnit, deleteUnit, updateUnit, getPersonalList, addProject,
    deleteProject, updateProject, getProject } from '@/api/api'

const state = {
    unitList: [],
}

const mutations = {
    UPDATE_STATE: (state, list) => {
        state.unitList = list
    }
}

const actions = {
    getUnitList({ commit }, params) {
        return new Promise((resolve, reject) => {
            getUnitList(params).then(res => {
                // console.log(res, 'ressss')
                resolve(res.model)
            }).catch(err => {
                reject(err)
            })
        })
    },
    addUnit({commit}, params) {
        return new Promise((resolve, reject) => {
            addUnit(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteUnit({ commit }, params) {
        return new Promise((resolve, reject) => {
            deleteUnit(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateUnit({ commit }, params) {
        return new Promise((resolve, reject) => {
            updateUnit(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getPersonalList({ commit }, params) {
        return new Promise((resolve, reject) => {
            getPersonalList(params).then(res => {
                resolve(res.model)
            }).catch(err => {
                reject(err)
            })
        })
    },
    addProject({commit}, params) {
        return new Promise((resolve, reject) => {
            addProject(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateProject({commit}, params) {
        return new Promise((resolve, reject) => {
            updateProject(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteProject({commit}, params) {
        return new Promise((resolve, reject) => {
            deleteProject(params).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getProject({commit}, params) {
        return new Promise((resolve, reject) => {
            getProject(params).then(res => {
                resolve(res.model)
            }).catch(err => {
                reject(err)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}