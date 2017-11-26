import { fork } from 'redux-saga/effects'
import headerSaga from './header/headerSaga';
import modalSaga from './modals/modalSaga';
import homeSaga from './home/homeSaga';
import globalSaga from './global/globalSaga';
import contentSaga from './content/contentSaga';
import programmingSaga from './programming/programmingSaga';
import gamingSaga from './gaming/gamingSaga';
import apiSaga from './api/apiSaga';

function* frontendSaga() {
  yield [
      fork(headerSaga),
      fork(modalSaga),
      fork(homeSaga),
      fork(globalSaga),
      fork(gamingSaga),
      fork(programmingSaga),
      fork(contentSaga),
      fork(apiSaga)
  ];
}

export default frontendSaga;