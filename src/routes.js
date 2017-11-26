// src/routes.js
import React from 'react';
import {Router, Route} from 'react-router';

import App from './app';
import Home from './home';
import Content from './content';
import Gaming from './gaming';
import Programming from './programming';
import Game from './gaming/components/Game';
import Project from './programming/components/Project';
import Article from './content/components/Article';
import ReactGA from 'react-ga';

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

if (process.env.NODE_ENV !== 'development') {
    ReactGA.initialize('UA-60146605-1');
}

function logPageView() {
    if (process.env.NODE_ENV !== 'local') {
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}

/**
 * The routing information for the app
 */
const Routes = (props) => (
    <Router {...props} onUpdate={logPageView}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/game" component={Gaming}/>
            <Route path="/game/:id/:name" component={Game}/>
            <Route path="/programming" component={Programming}/>
            <Route path="/programming/:name" component={Project}/>
            <Route path="/content" component={Content}/>
            <Route path="/content/:id/:title" component={Article}/>
        </Route>
    </Router>
);

export default Routes;