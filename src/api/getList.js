import axios from '../libs/api.request'

export const getList = () => {
    const data = {
        page: 1,
        limit: 20,
        type: 0
    }
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