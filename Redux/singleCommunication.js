import axios from 'axios';
import {setSingleFriend} from './userSingleFriend';
import deviceState from '../services/deviceState';

const TOKEN = 'id_token';

const SET_SINGLE_COMMUNICATION = 'SET_SINGLE_COMMUNICATION';
const RESET_SINGLE_COMMUNICATION = 'RESET_SINGLE_COMMUNICATION';

export const setCommunication = singleCommunication => {
  return {
    type: SET_SINGLE_COMMUNICATION,
    singleCommunication,
  };
};

export const resetCommunication = () => {
  return {
    type: RESET_SINGLE_COMMUNICATION,
    singleCommunication: {},
  };
};

export const getSingleCommunication = contactId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/contacts/authenticated/byContactId/${contactId}`,
      );
      dispatch(setCommunication(data.singleCommunication));
      dispatch(setSingleFriend(data.singleCommunication.friend));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _createCommunication = communication => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.post(
          `http://192.168.86.32:8080/api/communications/`,
          communication,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.newCommunication) {
          dispatch(setCommunication(data.newCommunication));
        }
      }
    } catch (error) {
      console.log('_Create Communication Error: ' + error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_COMMUNICATION:
      return action.singleCommunication;
    case RESET_SINGLE_COMMUNICATION:
      return action.singleCommunication;
    default:
      return state;
  }
};
