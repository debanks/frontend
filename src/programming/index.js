import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProgrammingComponent from './components/programmingComponent';
import './index.sass';
import {requestContent} from './actions';

class Programming extends Component {

    render() {
        const {className, ...props} = this.props;
        return (
            <ProgrammingComponent {...props}/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        projects: state.programming.projects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: () => {
            dispatch(requestContent());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Programming);