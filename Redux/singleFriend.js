import axios from 'axios';
import deviceState from '../services/deviceState';

const SET_SINGLE_FRIEND = 'SET_SINGLE_FRIEND';
const RESET_SINGLE_FRIEND = 'RESET_SINGLE_FRIEND';

export const setSingleFriend = singleFriend => {
  return {
    type: SET_SINGLE_FRIEND,
    singleFriend,
  };
};

export const resetSingleFriend = singleFriend => {
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
