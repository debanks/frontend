import { fork } from 'redux-saga/effects'
import loginSaga from './login/loginSaga';
import headerSaga from './header/headerSaga';
import modalSaga from './modals/modalSaga';

function* parrotSaga() {
  yield [
      fork(loginSaga),
      fork(headerSaga),
      fork(modalSaga)
  ];
}

export default parrotSaga;