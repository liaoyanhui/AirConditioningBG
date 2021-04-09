/*
 * @Descripttion: 接口api
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 10:44:14
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-08 14:13:03
 */

import request from '@/utils/request'

export function getOrganList(params) {
    return request({
        url: '/iot/mobile/organ/findByOrganId',
        method: 'get',
        params
    })
}
