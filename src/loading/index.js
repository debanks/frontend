import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoadingComponent from './components/loadingComponent';
var DocumentTitle = require('react-document-title');
import './index.sass';

function mapStateToProps(state) {
    return {
        showing: state.loading.showing,
        text: state.loading.text,
        icon: state.loading.icon
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingComponent);