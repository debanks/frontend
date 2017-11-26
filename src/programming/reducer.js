import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function programming(state = {
    projects: [],
    name: false,
    project: {
        name: "",
        description: "",
        large_image_url: ""
    },
    content: []
}, action) {
    switch (action.type) {
        case types.PROGRAMMING_SUCCESS:
            return Object.assign({}, state, {
                projects: action.projects
            });
        case types.PROGRAMMING_SINGLE_REQUEST:
            return Object.assign({}, state, {
                name: action.name
            });
        case types.PROGRAMMING_SINGLE_SUCCESS:
            return Object.assign({}, state, {
                content: action.content,
                project: action.project
            });
        default:
            return state
    }
}
