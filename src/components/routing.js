import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Create from './create.component';
import Edit from './edit.component';
import Index from './index.component';
import Login from './login.component';
import Home from './home.component';
import Register from './register.component';
import Profile from './profile.component';

import AuthHelperMethods from "../AuthHelperMethods";
const Auth = new AuthHelperMethods();

class Routing extends Component {
    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                Auth.loggedIn() === true
                ? <Component {...props} />
                : <Redirect to='/login' />
            )} />
        )
        return (
            <Switch>
                {/* <Route exact path='/create' component={ Create } /> */}
                {/* <Route path='/edit/:id' component={ Edit } /> */}
                {/* <Route path='/index' component={ Index } /> */}
                <Route exact path='/' component={ Home } />
                <Route exact path='/register' component={ Register } />
                <Route path='/login' component={ Login } />
                <PrivateRoute path="/index" component={Index} />
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/edit/:id" component={Edit} />
                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        );
      
    }
    
    
}

  
export default Routing;
       