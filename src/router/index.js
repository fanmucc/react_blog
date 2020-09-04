import App from '../App'
// 全页面显示组件
import Error404 from '../views/error/404'
import Error405 from '../views/error/405'

// 二级路由组件
import List from '../views/list'


export const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/404',
        component: Error404
    },
    {
        path: '/405',
        component: Error405
    }
]

export const secroutes = [
    {
        path: '/',
        component: List
    }
]