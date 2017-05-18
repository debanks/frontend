import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendUserInfo, requestCloseModal} from './actions';
import ModalComponent from './components/modalComponent';
var DocumentTitle = require('react-document-title');
import './index.sass';

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        showUserModal: state.modal.showUserModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserInfo: (user) => {
            dispatch(sendUserInfo(user));
        },
        closeModal: (modal) => {
            dispatch(requestCloseModal(modal));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalComponent);