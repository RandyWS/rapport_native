import {combineReducers} from 'redux';
import user from './user';
import loggedIn from './loggedIn';
import userFriends from './userFriends';
import contacts from './contacts';
import authMessage from './authMessage';
import singleContact from './singleContact';
import singleFriend from './userSingleFriend';

const appReducer = combineReducers({
  user,
  userFriends,
  loggedIn,
  contacts,
  authMessage,
  singleContact,
  singleFriend,
});

export default appReducer;
