import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from './components/homeComponent';
import './index.sass';
import {requestContent} from './actions';

class Home extends Component {

    render() {
        const {className, ...props} = this.props;
        return (
            <HomeComponent {...props}/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        top: state.home.top,
        articles: state.home.articles,
        projects: state.home.projects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: () => {
            dispatch(requestContent());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);