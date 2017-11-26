import React from 'react';
import {connect} from 'react-redux';
import HeaderComponent from './components/headerComponent';
import {requestLogout, loginUser, requestItems} from './actions';
import {showEditor} from '../global/actions';
import './index.sass';

function mapStateToProps(state) {
    return {
        user: state.header.user,
        items: state.header.items,
        show: state.global.show
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogout: () => {
            dispatch(requestLogout())
        },
        login: (e, creds) => {
            e.preventDefault();
            dispatch(loginUser(creds));
        },
        getItems: () => {
            dispatch(requestItems());
        },
        editorShow: (editor) => {
            dispatch(showEditor(editor, false, false, false));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);