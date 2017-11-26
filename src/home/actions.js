import * as types from './actionTypes';

export function requestContent() {
    return {
        type: types.HOME_REQUEST
    }
}

export function success(data) {
    return {
        type: types.HOME_SUCCESS,
        top: data.top,
        articles: data.articles,
        projects: data.projects
    }
}
