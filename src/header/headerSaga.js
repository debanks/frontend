import { put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {showLoading, hideLoading} from '../loading/actions';
import {logoutSuccessful, logoutFailed} from './actions';
import {browserHistory} from 'react-router';
import * as types from './actionTypes';

export const isOnline = (state) => state.call.isOnline;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logout(action) {
    try {
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(showLoading("Logging Out", "calling"));
        let online = yield select(isOnline);
        yield delay(1000);
        yield localStorage.removeItem('user');
        yield put(logoutSuccessful());
        yield put(hideLoading());
    } catch (e) {
        yield put(logoutFailed());
    }
}

function* redirectLogout(action) {
    yield browserHistory.push("/login");
}


/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* headerSaga() {
    yield takeLatest(types.LOGOUT_REQUEST, logout);
    yield takeLatest(types.LOGOUT_SUCCESS, redirectLogout);
}

export default headerSaga;