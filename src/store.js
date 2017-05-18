import { createStore, applyMiddleware } from 'redux';
import rootReducer from  './rootReducer';
export default(sagaMiddleware) => {
    return createStore(rootReducer, applyMiddleware(sagaMiddleware));
}