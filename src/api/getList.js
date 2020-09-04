import axios from '../libs/api.request'

export const getList = () => {
    const data = {

    }
    return axios.request({
        url: '',
        data,  // 如果是get请求信息 就为 params: {}
        methods: 'post'
    })
}