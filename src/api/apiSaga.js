import {put, takeLatest, call} from 'redux-saga/effects';
import {dataSuccess, dataFailure} from './actions';
import {showLoading, hideLoading} from '../loading/actions';
import ApiService from './ApiService';
import * as types from './actionTypes';

function* callApiInsert(action) {
    try {

        yield put(showLoading("Saving Algorithm", "spinner"));
        let response = yield call(ApiService.performRequest, '/api/' + action.url, true, 'POST', action.object);

        if (response) {
            yield put(action.action());
            yield put(dataSuccess(response));
        } else {
            yield put(dataFailure());

        }
        yield put(hideLoading());

    } catch (e) {
        yield put(dataFailure());
        yield put(hideLoading());
    }
}

function* callApiUpdate(action) {
    try {

        yield put(showLoading("Updating Algorithm", "spinner"));
        let response = yield call(ApiService.performRequest, '/api/' + action.url + "/" + action.objectId, true, 'POST', action.object);

        if (response) {
            yield put(action.action());
            yield put(dataSuccess(response));
        } else {
            yield put(dataFailure());

        }
        yield put(hideLoading());

    } catch (e) {
        yield put(dataFailure());
        yield put(hideLoading());
    }
}

function* callApiDelete(action) {
    try {

        yield put(showLoading("Deleting Algorithm", "spinner"));
        let response = yield call(ApiService.performRequest, '/api/' + action.url + "/" + action.objectId, true, 'DELETE');

        if (response) {
            yield put(action.action());
            yield put(dataSuccess(response));
        } else {
            yield put(dataFailure());

        }
        yield put(hideLoading());

    } catch (e) {
        yield put(dataFailure());
        yield put(hideLoading());
    }
}

function* callApiGet(action) {
    try {

        let response = yield call(ApiService.performRequest, action.url, true, 'GET');

        if (response) {
            if (action.action) {
                yield put(action.action());
            }
            yield put(dataSuccess(response));
        } else {
            yield put(dataFailure());

        }

    } catch (e) {
        yield put(dataFailure());
    }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* modalSaga() {
    yield takeLatest(types.API_INSERT, callApiInsert);
    yield takeLatest(types.API_UPDATE, callApiUpdate);
    yield takeLatest(types.API_DELETE, callApiDelete);
    yield takeLatest(types.API_GET, callApiGet);
}

export default modalSaga;