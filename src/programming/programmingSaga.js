import { put, call, takeLatest } from 'redux-saga/effects';
import {success, successSingle} from './actions';
import {showLoading, hideLoading} from '../loading/actions';
import * as types from './actionTypes';
import ApiService from '../api/ApiService';

function* getContent(action) {
    try {

        yield put(showLoading("Loading...", "spinner"));
        let response = yield call(ApiService.performRequest, '/api/programming', true, 'GET');

        if (response) {
            yield put(success(response));
        }
        yield put(hideLoading());

    } catch (e) {
        yield put(hideLoading());
    }
}

function* getProject(action) {
    try {

        yield put(showLoading("Loading...", "spinner"));
        let response = yield call(ApiService.performRequest, '/api/programming/' + action.name, true, 'GET');

        if (response) {
            yield put(successSingle(response));
        }
        yield put(hideLoading());

    } catch (e) {
        yield put(hideLoading());
    }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* programmingSaga() {
    yield takeLatest(types.PROGRAMMING_REQUEST, getContent);
    yield takeLatest(types.PROGRAMMING_SINGLE_REQUEST, getProject);
}

export default programmingSaga;