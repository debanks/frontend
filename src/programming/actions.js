import * as types from './actionTypes';

export function requestContent() {
    return {
        type: types.PROGRAMMING_REQUEST
    }
}

export function success(data) {
    return {
        type: types.PROGRAMMING_SUCCESS,
        projects: data.projects
    }
}

export function requestPage(name) {
    return {
        type: types.PROGRAMMING_SINGLE_REQUEST,
        name: name
    }
}

export function successSingle(data) {
    return {
        type: types.PROGRAMMING_SINGLE_SUCCESS,
        project: data.project,
        content: data.content
    }
}
