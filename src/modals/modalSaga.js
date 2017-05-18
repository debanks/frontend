import { put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {showLoading, hideLoading} from '../loading/actions';
import {updateUser} from '../login/actions';
import {userInfoFailed, userInfoUpdated, openUserModal, closeUserModal} from './actions';
import * as types from './actionTypes';

export const isOnline = (state) => state.call.isOnline;

function* sendUserInfo(action) {
    let online = yield select(isOnline);
    try {
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(showLoading("Updating your Information", "spinner"));
        yield delay(1000);
        yield localStorage.setItem('user', JSON.stringify(action.userInfo));
        yield put(userInfoUpdated(online));
        yield put(updateUser(action.userInfo));
        yield put(hideLoading());
    } catch (e) {
        yield put(userInfoFailed(isOnline));
    }
}

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
    yield takeLatest(types.SEND_USER_INFO, sendUserInfo);
}

export default modalSaga;