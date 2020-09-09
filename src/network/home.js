// 所有首页的请求都在这里home.js进行统一管理
import { request } from './request'
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}