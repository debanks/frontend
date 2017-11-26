import * as types from './actionTypes';


export function requestApiInsert(url, object, action) {
    return {
        type: types.API_INSERT,
        url: url,
        object: object,
        action: action
    }
}

export function requestApiUpdate(url, object, objectId, action) {
    return {
        type: types.API_UPDATE,
        url: url,
        objectId: objectId,
        object: object,
        action: action
    }
}

export function requestApiDelete(url, objectId, action) {
    return {
        type: types.API_DELETE,
        url: url,
        objectId: objectId,
        action: action
    }
}

export function requestApiGet(url, action) {
    return {
        type: types.API_GET,
        url: url,
        action: action
    }
}

export function dataSuccess() {
    return {
        type: types.API_SUCCESS
    }
}

export function dataFailure() {
    return {
        type: types.API_SUCCESS
    }
}