import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? '' : ''
const axios = HttpRequest(baseUrl)
export default axios