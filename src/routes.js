// src/routes.js
import React from 'react';
import {Router, Route} from 'react-router';

import App from './app';
import Login from './login';
import Home from './home';

/**
 * Checks if user is logged in, if not shifts to login page
 */
function requireAuth(nextState, replace) {
    if (!localStorage.getItem('user')) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname, search: nextState.location.search}
        })
    }
}

/**
 * The routing information for the app
 */
const Routes = (props) => (
    <Router {...props}>
        <Route component={App}>
            <Route path="/" component={Home} onEnter={requireAuth}/>
            <Route path="/login" component={Login}/>
        </Route>
    </Router>
);

export default Routes;