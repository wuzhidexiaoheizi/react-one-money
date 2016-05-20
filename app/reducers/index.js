import {combineReducers} from 'redux';
import list from './list';
import alert from './alert';
import seed from './seed';
import user from './user';
import signup from './signup';

const rootReducer = combineReducers({
  list,
  alert,
  seed,
  user,
  signup
});

export default rootReducer;
