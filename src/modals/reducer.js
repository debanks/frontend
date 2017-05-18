import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function modal(state = {
    userInfo: false,
    showUserModal: false,
    modal: false
}, action) {
    switch (action.type) {
        case types.SEND_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            });
        case types.USER_INFO_UPDATED:
            return Object.assign({}, state, {
                userInfo: false
            });
        case types.USER_INFO_FAILED:
            return Object.assign({}, state, {
                userInfo: false
            });
        case types.REQUEST_OPEN_MODAL:
            return Object.assign({}, state, {
                modal: action.modal
            });
        case types.REQUEST_CLOSE_MODAL:
            return Object.assign({}, state, {
                modal: action.modal
            });
        case types.OPEN_MODAL:
            return Object.assign({}, state, {
                showUserModal: action.showUserModal
            });
        case types.CLOSE_MODAL:
            return Object.assign({}, state, {
                showUserModal: action.showUserModal
            });
        default:
            return state
    }
}
