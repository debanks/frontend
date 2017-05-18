import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('user'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false,
    message: false
}, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            });
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: false,
                user: action.user
            });
        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.errorMessage,
                user: false
            });
        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        case types.UPDATE_USER:
            return Object.assign({}, state, {
                user: action.user
            });
        default:
            return state
    }
}
