import {combineReducers} from 'redux';
import user from './user';
import auth from './auth';
import friends from './friends';
import contacts from './contacts';
import singleComm from './singleComm';
import singleFriend from './singleFriend';

const appReducer = combineReducers({
  auth,
  user,
  friends,
  singleFriend,
  singleComm,
});

export default appReducer;

export * from './auth';
export * from './user';
export * from './friends';
export * from './singleFriend';
export * from './singleComm';

// auth,
// contacts,
// singleFriend,
