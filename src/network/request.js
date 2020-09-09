import axios from 'axios'
export function request(config) {
    //  1、创建实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/z8',
        timeout: 10000
    })

    //  2、拦截请求
    instance.interceptors.response.use(res => { return res.data }, err => { console.log(err); })

    //  3、发送真正的请求
    return instance(config)
}