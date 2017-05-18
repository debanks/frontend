import * as types from './actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function header(state = {
    showing: false,
    text: "Loading",
    icon: "spinner"
}, action) {
    switch (action.type) {
        case types.SHOW_LOADING:
            return Object.assign({}, state, {
                showing: action.showing,
                text: action.text,
                icon: action.icon
            });
        case types.HIDE_LOADING:
            return Object.assign({}, state, {
                showing: action.showing
            });
        default:
            return state
    }
}
