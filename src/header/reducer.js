import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function header(state = {
    isFetching: false,
    isAuthenticated: true,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false,
    creds: {},
    items: []
}, action) {
    switch (action.type) {
        case types.LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                user: false
            });
        case types.LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                submitStatus: 'pending',
                creds: action.creds
            });
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                errorMessage: false,
                user: action.user,
                submitStatus: 'success',
                open: false
            });
        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: "Failed to login, check your credentials",
                errorType: 'danger',
                submitStatus: false,
                user: false
            });
        case types.HEADER_SUCCESS:
            return Object.assign({}, state, {
                items: action.items
            });
        default:
            return state
    }
}
