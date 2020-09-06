import React, {Component} from 'react'
import Blayout from './layout'
import { secroutes } from './router'
import { Route, Redirect, Switch} from 'react-router-dom'

import './App.css'
class App extends Component {
    render () {
        return (
            <div className="App">
                <Blayout history={this.props.history}>
                    <Switch>
                        {
                            secroutes.map(item => {
                                return <Route key={item.path} path={item.path} component={item.component} exact/>
                            })
                        }
                        <Redirect from="/" to="/" exact/>
                    </Switch>
                </Blayout>
            </div>
        )
    }
}

export default App