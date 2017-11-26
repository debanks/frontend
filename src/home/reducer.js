import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function home(state = {
    top: false,
    articles: [],
    projects: []
}, action) {
    switch (action.type) {
        case types.HOME_SUCCESS:
            return Object.assign({}, state, {
                top: action.top,
                articles: action.articles,
                projects: action.projects
            });
        default:
            return state
    }
}
