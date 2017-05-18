import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from './actions';
import LoginComponent from './components/loginComponent';
var DocumentTitle = require('react-document-title');
import './index.sass';

function mapStateToProps(state, ownProps) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogin: (event, creds) => {
            event.preventDefault();
            dispatch(loginUser(creds));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);