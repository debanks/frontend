import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function api(state = {
    url: '',
    object: {},
    action: null,
    objectId: null
}, action) {
    switch (action.type) {
        case types.API_INSERT:
            return Object.assign({}, state, {
                url: action.url,
                object: action.object,
                action: action.action
            });
        case types.API_UPDATE:
            return Object.assign({}, state, {
                url: action.url,
                objectId: action.objectId,
                object: action.object,
                action: action.action
            });
        case types.API_DELETE:
            return Object.assign({}, state, {
                url: action.url,
                object: action.object,
                action: action.action
            });
        case types.API_GET:
            return Object.assign({}, state, {
                url: action.url,
                action: action.action
            });
        default:
            return state
    }
}
