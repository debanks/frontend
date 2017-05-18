import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Store from './store';
import parrotSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';

import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.sass';

const sagaMiddleware = createSagaMiddleware();
const StoreInstance = Store(sagaMiddleware);

sagaMiddleware.run(parrotSaga);

ReactDOM.render(
    <Provider store={StoreInstance}>
        <Routes history={browserHistory} />
    </Provider>
  ,
  document.getElementById('root')
);