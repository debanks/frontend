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

