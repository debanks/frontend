import * as types from './actionTypes';

export function requestContent() {
    return {
        type: types.GAMING_REQUEST
    }
}

export function success(data) {
    return {
        type: types.GAMING_SUCCESS,
        playing: data.playing,
        games: data.games,
        content: data.content
    }
}

export function requestPage(id) {
    return {
        type: types.GAMING_SINGLE_REQUEST,
        id: id
    }
}

export function successSingle(data) {
    return {
        type: types.GAMING_SINGLE_SUCCESS,
        game: data.game,
        content: data.content
    }
}
