import * as types from './actionTypes';

export function requestLogout() {
    return {
        type: types.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

export function logoutSuccessful() {
    return {
        type: types.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
        id_token: false
    }
}

export function logoutFailed() {
    return {
        type: types.LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: true
    }
}

export function loginUser(creds) {
    return {
        type: types.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds: creds
    }
}

export function receiveLogin(user) {
    return {
        type: types.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user
    }
}

export function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: message
    }
}

export function requestItems() {
    return {
        type: types.HEADER_REQUEST
    }
}

export function itemSuccess(data) {
    return {
        type: types.HEADER_SUCCESS,
        items: data.items
    }
}