import App from '../App'
// 全页面显示组件
import Detail from '../views/Detail'
import Error404 from '../views/error/404'
import Error405 from '../views/error/405'

// 二级路由组件
import Home from '../views/Home'
import VuePage from '../views/Vue'

export const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/post/:id',
        component: Detail
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
        component: Home
    },
    {
        path: '/vue',
        component: VuePage
    }
]