import { combineReducers } from 'redux'
import loading from './loading/reducer';
import header from './header/reducer';
import modal from './modals/reducer';
import home from './home/reducer';
import global from './global/reducer';
import content from './content/reducer';
import programming from './programming/reducer';
import gaming from './gaming/reducer';
import api from './api/reducer';

const rootReducer = combineReducers({
  loading, header, modal, home, global, content, programming, gaming, api
});

export default rootReducer