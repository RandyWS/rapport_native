import {combineReducers} from 'redux';
import user from './user';
import auth from './auth';
import friends from './friends';
import comm from './comm';
import singleComm from './singleComm';
import singleFriend from './singleFriend';

const appReducer = combineReducers({
  auth,
  user,
  friends,
  comm,
  singleFriend,
  singleComm,
});

export default appReducer;

export * from './auth';
export * from './user';
export * from './friends';
export * from './singleFriend';
export * from './singleComm';
export * from './comm';
