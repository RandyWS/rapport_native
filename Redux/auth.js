import axios from 'axios';
import deviceState from '../services/deviceState';
import {_fetchUser, setUser} from './user';

const TOKEN = 'id_token';

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

export const setAuth = authentication => {
  return {
    type: SET_AUTH,
    authentication,
  };
};

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
    authentication: {},
  };
};

export const logout = newJWT => {
  return async dispatch => {
    try {
      console.log('newJWT', newJWT);
      deviceState.deleteJWT();
      newJWT('', {});
      dispatch(setAuth({loggedIn: false}));
    } catch (error) {
      console.log('Logout Error: ' + error);
    }
  };
};

export const authenticate = (method, formData, newJWT) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `http://192.168.86.32:8080/api/auth/${method}`,
        formData,
      );

      if (data.token) {
        deviceState.saveItem(TOKEN, data.token);

        const res = await axios.get('http://192.168.86.32:8080/api/auth/me', {
          headers: {
            authorization: data.token,
          },
        });

        newJWT(data.token, res.data);

        return dispatch(setAuth({loggedIn: !!res.data.id, ...res.data}));
      } else {
        dispatch(setAuth({loggedIn: data.loggedIn, message: data.message}));
      }
    } catch (error) {
      console.log('Authenticate Error: ' + error);
    }
  };
};

export default (state = false, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.authentication;
    case CLEAR_AUTH:
      return action.authentication;
    default:
      return state;
  }
};
