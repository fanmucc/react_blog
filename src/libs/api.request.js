import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7002' : ''
const axios = new HttpRequest(baseUrl)
export default axios