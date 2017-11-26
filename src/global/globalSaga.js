import { put, takeLatest, call } from 'redux-saga/effects';
import {contentSuccess, globalImageSuccess, thoughtSuccess} from './actions';
import ApiService from '../api/ApiService';
import * as types from './actionTypes';

function* requestContent(action) {
    try {
        let response = yield call(ApiService.performRequest, action.url + "&page=" + action.page, true, 'GET');

        if (response) {
            yield put(contentSuccess(response));
        } else {

        }

    } catch (e) {

    }
}

function* uploadImage(action) {
    try {
        let response = yield call(ApiService.performRequest, '/api/image', true, 'POST', false, false, action.file);

        if (response) {
            if (action.action) {
                yield put(action.action(response.url));
            }
            yield put(globalImageSuccess())
        } else {

        }

    } catch (e) {

    }
}

function* submitThought(action) {
    try {
        let response = yield call(ApiService.performRequest, "/api/thought", true, 'POST', action.thought);

        if (response && response.status) {
            yield put(thoughtSuccess());
        } else {

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
function* globalSaga() {
    yield takeLatest(types.GLOBAL_CONTENT_REQUEST, requestContent);
    yield takeLatest(types.GLOBAL_IMAGE_UPLOAD, uploadImage);
    yield takeLatest(types.GLOBAL_THOUGHT_REQUEST, submitThought);
}

export default globalSaga;