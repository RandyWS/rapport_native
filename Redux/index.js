import {combineReducers} from 'redux';
import user from './user';
import auth from './auth';
import userFriends from './userFriends';
import contacts from './contacts';
import authMessage from './authMessage';
import singleCommunication from './singleCommunication';
import singleFriend from './userSingleFriend';

const appReducer = combineReducers({
  auth,
});

export default appReducer;

export * from './auth';

// user,
// userFriends,
// auth,
// contacts,
// authMessage,
// singleCommunication,
// singleFriend,
