import { combineReducers } from 'redux'
import auth from './login/reducer';
import loading from './loading/reducer';
import header from './header/reducer';
import modal from './modals/reducer';

const rootReducer = combineReducers({
  auth, loading, header, modal
});

export default rootReducer