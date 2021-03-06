import {combineReducers} from 'redux';
import list from './list';
import alert from './alert';
import seed from './seed';
import user from './user';

const rootReducer = combineReducers({
  list,
  alert,
  seed,
  user
});

export default rootReducer;
