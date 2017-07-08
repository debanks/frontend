import React, {Component} from 'react';
import classnames from 'classnames';
import {browserHistory} from 'react-router';
import Header from '../header';

class App extends Component {

    render() {
        const {...props} = this.props;
        return (
            <div>
                <main className="main-component">
                    { this.props.children }
                </main>
                <Header />
            </div>
        );
    }
}

export default App;