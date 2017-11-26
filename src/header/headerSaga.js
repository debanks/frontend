import { put, takeLatest, select, call } from 'redux-saga/effects';
import {showLoading, hideLoading} from '../loading/actions';
import {logoutSuccessful, logoutFailed, receiveLogin, loginError, itemSuccess} from './actions';
import {browserHistory} from 'react-router';
import ApiService from '../api/ApiService';
import * as types from './actionTypes';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logout(action) {
    try {
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(showLoading("Logging Out", "calling"));
        yield localStorage.removeItem('user');
        yield localStorage.removeItem('hash');
        yield put(logoutSuccessful());
        yield put(hideLoading());
    } catch (e) {
        yield put(logoutFailed());
    }
}

function* fetchUser(action) {
    console.log(action);

    try {
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(showLoading("Logging In", "spinner"));
        let authHash = btoa(action.creds.email + ':' + action.creds.password);
        let response = yield call(ApiService.performRequest, '/api/userAuth', false, 'POST', '{}', authHash);

        if (response) {
            yield localStorage.setItem("user", JSON.stringify(response.user));
            yield localStorage.setItem("hash", authHash);
            yield put(receiveLogin(response.user));
        } else {
            yield put(loginError("Invalid Credentials"));

        }
        yield put(hideLoading());

    } catch (e) {
        yield put(loginError("System Error"));
        yield put(hideLoading());
    }
}

function* getItems(action) {
    try {

        let response = yield call(ApiService.performRequest, '/api/header', true, 'GET');

        if (response) {
            yield put(itemSuccess(response));
        }

    } catch (e) {
    }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* headerSaga() {
    yield takeLatest(types.LOGOUT_REQUEST, logout);
    yield takeLatest(types.LOGIN_REQUEST, fetchUser);
    yield takeLatest(types.HEADER_REQUEST, getItems);
}

export default headerSaga;