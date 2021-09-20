import axios from 'axios';
import {setUserFriends} from './userFriends';
import {setAuthentication} from './loggedIn';
import {setMessage} from './authMessage';

const SET_USER = 'SET_USER';

export const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

const routeToCalendar = () => {};

export const _fetchUser = (username, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/user/authenticated/${username}`);
      dispatch(setAuthentication(data.loggedIn));
      dispatch(setMessage(data.message));
      if (data.user) {
        dispatch(setUser(data.user));
        dispatch(setUserFriends(data.user.friends));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (newUser, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/user/signup`, newUser);
      dispatch(setUser(data.user));
      const path = `/user/${data.user.userName}`;
      history.push(path);
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
