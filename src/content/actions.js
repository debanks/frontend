import * as types from './actionTypes';

export function requestContent(query, type) {
    return {
        type: types.CONTENT_REQUEST,
        query: query,
        contentType: type
    }
}

export function success(data) {
    return {
        type: types.CONTENT_SUCCESS,
        content: data.content,
        count: data.count
    }
}

export function requestPage(id) {
    return {
        type: types.CONTENT_SINGLE_REQUEST,
        id: id
    }
}

export function successSingle(data) {
    return {
        type: types.CONTENT_SINGLE_SUCCESS,
        article: data.article,
        item: data.item
    }
}
