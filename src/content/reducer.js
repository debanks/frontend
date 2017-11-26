import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function content(state = {
    content: [],
    count: 0,
    contentType: "all",
    query: "",
    article: {},
    item: null
}, action) {
    switch (action.type) {
        case types.CONTENT_REQUEST:
            return Object.assign({}, state, {
                query: action.query,
                contentType: action.contentType
            });
        case types.CONTENT_SUCCESS:
            return Object.assign({}, state, {
                content: action.content,
                count: action.count
            });
        case types.CONTENT_SINGLE_REQUEST:
            return Object.assign({}, state, {
                id: action.id
            });
        case types.CONTENT_SINGLE_SUCCESS:
            return Object.assign({}, state, {
                article: action.article,
                item: action.item
            });
        default:
            return state
    }
}
