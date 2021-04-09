/*
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-03-29 10:39:57
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-08 14:07:01
 */
import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/vue-admin-template/user/login',
  //   method: 'post',
  //   data
  // })
  // code: 20000
  // data: { token: "admin-token" }
  // token: "admin-token"
  let res = {
    code: 2000,
    data: {
      token: 'admin-token'
    }
  }
  return Promise.resolve(res)
}

export function getInfo(token) {
  let mock = {
    code: 20000,
    data: {
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      introduction: "I am a super administrator",
      name: "Super Admin",
      roles: ["admin"]
    }
  }
  
  return Promise.resolve(mock)
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
