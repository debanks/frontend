import * as types from './actionTypes';


export function requestOpenModal(modal) {
    return {
        type: types.REQUEST_OPEN_MODAL,
        modal: modal
    }
}
export function requestCloseModal(modal) {
    return {
        type: types.REQUEST_CLOSE_MODAL,
        modal: modal
    }
}

export function openUserModal() {
    return {
        type: types.OPEN_MODAL,
        showUserModal: true
    }
}

export function closeUserModal() {
    return {
        type: types.CLOSE_MODAL,
        showUserModal: false
    }
}

export function sendUserInfo(user) {
    return {
        type: types.SEND_USER_INFO,
        status: "Updating your Information",
        userInfo: user
    }
}

export function userInfoUpdated(isOnline) {
    return {
        type: types.USER_INFO_UPDATED,
        status: isOnline ? "Waiting for Calls" : "Currently Offline"
    }
}

export function userInfoFailed(isOnline) {
    return {
        type: types.USER_INFO_FAILED,
        status: isOnline ? "Waiting for Calls" : "Currently Offline"
    }
}