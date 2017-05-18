import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {receiveLogin, loginError} from './actions';
import {browserHistory} from 'react-router'
import {showLoading, hideLoading} from '../loading/actions';
import * as types from './actionTypes';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {

    let user = {
        "demo": {
            id: 1,
            first_name: "Demo",
            last_name: "Account",
            user_level: "user",
            call_center: "Transcend",
            call_center_level: "general",
            phone: false
        },
        "ccAdmin": {
            id: 1,
            first_name: "CC Admin",
            last_name: "Account",
            user_level: "admin",
            call_center: "Transcend",
            call_center_level: "general",
            phone: false
        },
        "super": {
            id: 1,
            first_name: "Super",
            last_name: "Account",
            user_level: "admin",
            call_center: "UE",
            call_center_level: "super",
            phone: false
        }
    };

    try {
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put(showLoading("Logging In", "spinner"));
        yield delay(1000);
        if (user[action.creds.email]) {
            yield localStorage.setItem("user", JSON.stringify(user[action.creds.email]));
            yield put(receiveLogin(user[action.creds.email]));
        } else {
            yield put(loginError("Invalid Credentials"))
        }

        yield put(hideLoading());
    } catch (e) {
        yield put(loginError("System Error"));
    }
}

function* redirect(action) {
    yield browserHistory.push("/");
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* loginSaga() {
    yield takeLatest(types.LOGIN_REQUEST, fetchUser);
    yield takeLatest(types.LOGIN_SUCCESS, redirect);
}

export default loginSaga;