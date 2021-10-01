import axios from 'axios';
import deviceState from '../services/deviceState';

const SET_COMM = 'SET_COMM';
const RESET_COMM = 'RESET_COMM';

export const setComm = comm => {
  return {
    type: SET_COMM,
    comm,
  };
};

export const resetComm = () => {
  return {
    type: SET_COMM,
    contacts: [],
  };
};

export const _fetchComm = () => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.get(
          `http://192.168.86.32:8080/api/communications/`,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.length) {
          dispatch(setComm(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_COMM:
      return action.comm;
    case RESET_COMM:
      return action.comm;
    default:
      return state;
  }
};
