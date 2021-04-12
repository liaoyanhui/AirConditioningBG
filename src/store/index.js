/*
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-03-29 10:39:57
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 13:52:58
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import userInformation from './modules/userInformation';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    userInformation
  },
  getters
})

export default store
