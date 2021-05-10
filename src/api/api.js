/*
 * @Descripttion: 接口api
 * @version:
 * @Author: shang xia
 * @Date: 2021-04-01 10:44:14
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 17:34:20
 */

import request from '@/utils/request'

// 获取单位列表
export function getUnitList(params) {
    return request({
        url: '/iot/mobile/organ/findPageWith',
        method: 'get',
        params
    })
}

// 添加单位
export function addUnit(params) {
    return request({
        url: '/iot/mobile/organ/add',
        method: 'get',
        params
    })
}

// 删除单位
export function deleteUnit(params) {
    return request({
        url: '/iot/mobile/organ/delete',
        method: 'get',
        params
    })
}

// 修改单位
export function updateUnit(params) {
    return request({
        url: '/iot/mobile/organ/update',
        method: 'get',
        params
    })
}

// 根据organId查询单位信息 暂时没用到
export function getByOrganId(params) {
    return request({
        url: '/iot/mobile/organ/findByOrganId',
        method: 'get',
        params
    })
}

// 新增人员
export function addPersonal(params) {
    return request({
        url: '/iot/mobile/user/add',
        method: 'get',
        params
    })
}

// 删除人员
export function deletePersonal(params) {
    return request({
        url: '/iot/mobile/user/delete',
        method: 'get',
        params
    })
}

// 根据userId查询人员信息 暂时没用到
export function getByUserId(params) {
    return request({
        url: '/iot/mobile/user/findByUserId',
        method: 'get',
        params
    })
}

// 查询人员列表
export function getPersonalList(params) {
    return request({
        url: '/iot/mobile/user/findPageWith',
        method: 'get',
        params
    })
}

// 更新人员信息
export function updatePersonal(params) {
    return request({
        url: '/iot/mobile/user/update',
        method: 'get',
        params
    })
}

// 新增项目
export function addProject(params) {
    return request({
        url: '/iot/mobile/project/add',
        method: 'get',
        params
    })
}

// 删除项目
export function deleteProject(params) {
    return request({
        url: '/iot/mobile/project/delete',
        method: 'get',
        params
    })
}

// 修改项目
export function updateProject(params) {
    return request({
        url: '/iot/mobile/project/update',
        method: 'get',
        params
    })
}

// 获取列表
export function getProject(params) {
    return request({
        url: '/iot/mobile/project/findPageWith',
        method: 'get',
        params
    })
}

// 获取省级
export function getProviceList(params) {
    return request({
        url: '/iot/mobile/project/findProviceList',
        method: 'get',
        params
    })
}

// 获取市级
export function getChildAreaByAreaId(params) {
    return request({
        url: '/iot/mobile/project/findChildAreaByAreaId',
        method: 'get',
        params
    })
}
