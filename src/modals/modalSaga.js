import { put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {showLoading, hideLoading} from '../loading/actions';
import {openUserModal, closeUserModal} from './actions';
import * as types from './actionTypes';


function* handleOpenModal(action) {
    if (action.modal === 'userModal') {
        yield put(openUserModal());
    }
}

function* handleCloseModal(action) {
    if (action.modal === 'userModal') {
        yield put(closeUserModal());
    }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* modalSaga() {
    yield takeLatest(types.REQUEST_OPEN_MODAL, handleOpenModal);
    yield takeLatest(types.REQUEST_CLOSE_MODAL, handleCloseModal);
}

export default modalSaga;