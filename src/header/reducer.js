import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function header(state = {
    isFetching: false,
    isAuthenticated: true
}, action) {
    switch (action.type) {
        case types.LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                id_token: action.id_token
            });
        case types.LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        default:
            return state
    }
}
