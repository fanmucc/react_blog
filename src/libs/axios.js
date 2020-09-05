import axios from 'axios'
const baseURL = 'http://127.0.0.1:7001'
class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }
        return config
    }

    destroy (url) {
        delete this.queue[url]
        if(!Object.keys(this.queue).length) {
            // 当请求池为空的时候加载进度条隐藏
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            if(!Object.keys(this.queue).length) {
                // 判断请求时为空时， 加载进度条显示
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const { data, status } = res
            return { data, status}
        }, error => {
            this.destroy(url)
            let errorInfo = error.response
            if (!errorInfo) {
                const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
                errorInfo = {
                statusText,
                status,
                request: { responseURL: config.url }
                }
            }
            return Promise.reject(error)
        })
    }

    request (options) {
        const instance = axios.create()
        console.log(options)
        options = Object.assign(this.getInsideConfig(), options)
        console.log(options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest