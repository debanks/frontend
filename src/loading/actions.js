import * as types from './actionTypes';

export function showLoading(text, icon) {
    return {
        type: types.SHOW_LOADING,
        showing: true,
        text: text,
        icon: icon
    }
}

export function hideLoading() {
    return {
        type: types.HIDE_LOADING,
        showing: false
    }
}
