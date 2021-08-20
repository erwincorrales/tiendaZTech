import React from 'react'
import Login from './views/Login'
import NotFound from './views/NotFound'
import Main from './views/Main'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () =>{
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login}/>
                <Route component={Main} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Router>
    )
}

export default App;