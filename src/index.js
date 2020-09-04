import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { routes } from './router'


ReactDom.render(
    <Router>
        <Switch>
            {
                routes.map(item => {
                    return <Route key={item.path} path={item.path} component={item.component}></Route>
                })
            }
            {/* 重定向 */}
            <Redirect from="/" to="/" exact></Redirect>
            {/* 错误指向 */}
            <Redirect to="/404" />
        </Switch>
    </Router>,
    document.getElementById('root')
)