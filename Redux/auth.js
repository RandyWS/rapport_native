import axios from 'axios';
import deviceState from '../services/deviceState';
import {_fetchUser, setUser} from './user';
import {setUserFriends} from './userFriends';
import {setMessage} from './authMessage';

const TOKEN = 'id_token';
const SET_AUTH = 'SET_AUTH';

export const setAuth = authentication => {
  return {
    type: SET_AUTH,
    authentication,
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      deviceState.deleteJWT();
      dispatch(setAuth({loggedIn: false}));
    } catch (error) {
      console.log('AsyncStorage logout Error: ' + error);
    }
  };
};

export const authenticate = (method, formData) => {
  return async dispatch => {
    try {
      console.log('method, formData', method, formData);
      const {data} = await axios.post(`api/auth/${method}`, formData);
      console.log('data sent back from log in', data);
      // if (data.token) {
      //   deviceState.saveItem(TOKEN, data.token);

      //   const res = await axios.get('/auth/me', {
      //     headers: {
      //       authorization: data.token,
      //     },
      //   });

      //   return dispatch(setAuth({loggedIn: !!res.data.id, ...res.data}));
      // } else {
      //   console.log('no token');
      //   dispatch(setAuth({loggedIn: false}));
      // }
    } catch (error) {
      console.log('AsyncStorage authenticate Error: ' + error);
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
