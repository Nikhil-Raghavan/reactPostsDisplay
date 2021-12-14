import React from 'react';
import LoginPage from '../Login'
import { Switch, Route,withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Dashboard from '../Dashboard'


const App = () => {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/dashboard' exact component={Dashboard} />                   
            </Switch>

        </div>

    )
}

export default App;