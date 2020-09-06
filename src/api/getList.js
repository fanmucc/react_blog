import axios from '../libs/api.request'

export const getList = (data) => {
    return axios.request({
        url: '/default',
        data,  // 如果是get请求信息 就为 params: {}
        method: 'post'
    })
}

export const getTags = () => {
    return axios.request({
        url:'/default/tag',
        method: 'get'
    })
}