import {combineReducers} from 'redux';
import user from './user';
import auth from './auth';
import friends from './friends';
import contacts from './contacts';
import singleCommunication from './singleCommunication';
import singleFriend from './userSingleFriend';

const appReducer = combineReducers({
  auth,
  user,
  friends,
  singleCommunication,
});

export default appReducer;

export * from './auth';
export * from './user';
export * from './friends';
export * from './singleCommunication';

// user,
// userFriends,
// auth,
// contacts,
// singleCommunication,
// singleFriend,
