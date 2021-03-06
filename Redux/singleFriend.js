import axios from 'axios';
import {editFriend, deleteFriend, deleteFriendComm} from './index';
import deviceState from '../services/deviceState';

const SET_SINGLE_FRIEND = 'SET_SINGLE_FRIEND';
const RESET_SINGLE_FRIEND = 'RESET_SINGLE_FRIEND';

export const setSingleFriend = singleFriend => {
  return {
    type: SET_SINGLE_FRIEND,
    singleFriend,
  };
};

export const resetSingleFriend = () => {
  return {
    type: RESET_SINGLE_FRIEND,
    singleFriend: {},
  };
};

export const _fetchSingleFriend = friendId => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.get(
          `http://192.168.86.32:8080/api/friends/${friendId}`,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.id) {
          dispatch(setSingleFriend(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _editFriend = (friend, friendId) => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();
      console.log(friend, friendId);
      if (token) {
        const {data} = await axios.put(
          `http://192.168.86.32:8080/api/friends/${friendId}`,
          friend,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.id) {
          dispatch(setSingleFriend(data));
          dispatch(editFriend(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _deleteFriend = (friendId, navigation) => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.delete(
          `http://192.168.86.32:8080/api/friends/${friendId}`,

          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data) {
          dispatch(deleteFriend(friendId));
          dispatch(deleteFriendComm(friendId));
          dispatch(resetSingleFriend());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_FRIEND:
      return action.singleFriend;
    case RESET_SINGLE_FRIEND:
      return action.singleFriend;
    default:
      return state;
  }
};
