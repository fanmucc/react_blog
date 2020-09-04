import React from 'react'
import Blayout from './layout'
import { secroutes } from './router'
import { Route, Redirect} from 'react-router-dom'
import './App.css'
function App () {
    return (
        <div className="App">
            <Blayout>
                {
                    secroutes.map(item => {
                        return <Route key={item.path} path={item.path} component={item.component} />
                    })
                }
                <Redirect from="/" to="/" exact/>
            </Blayout>
        </div>
    )
}

export default App