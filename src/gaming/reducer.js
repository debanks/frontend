import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function gaming(state = {
    playing: [],
    content: [],
    games: [],
    game: {
        large_image_url: "",
        description: "",
        review: null
    },
    id: false
}, action) {
    switch (action.type) {
        case types.GAMING_SUCCESS:
            return Object.assign({}, state, {
                playing: action.playing,
                content: action.content,
                games: action.games
            });
        case types.GAMING_SINGLE_REQUEST:
            return Object.assign({}, state, {
                id: action.id
            });
        case types.GAMING_SINGLE_SUCCESS:
            return Object.assign({}, state, {
                content: action.content,
                game: action.game
            });
        default:
            return state
    }
}
