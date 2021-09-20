import axios from 'axios';
import {_fetchUser, setUser} from './user';
import {setUserFriends} from './userFriends';
import {setMessage} from './authMessage';

const SET_AUTH = 'SET_AUTH';

export const setAuthentication = authentication => {
  return {
    type: SET_AUTH,
    authentication,
  };
};

export const _logIn = (credentials, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/user/login`, credentials);
      dispatch(setAuthentication(data.loggedIn));
      dispatch(setMessage(data.message));
      if (data.loggedIn === true) {
        dispatch(_fetchUser(credentials.username, history));
        const path = `/user/${credentials.username}`;
        history.push(path);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _logOut = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/user/logout');
      dispatch(setAuthentication(data.loggedIn));
      dispatch(setUser({}));
      dispatch(setUserFriends([]));
      dispatch(setMessage(data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const authenticate = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/user/authenticated');
      dispatch(setAuthentication(data.loggedIn));
      dispatch(setMessage(data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = false, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.authentication;
    default:
      return state;
  }
};
