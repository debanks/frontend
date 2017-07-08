// src/routes.js
import React from 'react';
import {Router, Route} from 'react-router';

import App from './app';
import Home from './home';

/**
 * The routing information for the app
 */
const Routes = (props) => (
    <Router {...props}>
        <Route component={App}>
            <Route path="/" component={Home} />
        </Route>
    </Router>
);

export default Routes;