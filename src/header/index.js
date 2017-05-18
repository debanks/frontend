import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderComponent from './components/headerComponent';
var DocumentTitle = require('react-document-title');
import {requestLogout} from './actions';
import './index.sass';

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogout: () => {
            dispatch(requestLogout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);