import axios from 'axios';
import deviceState from '../services/deviceState';

const TOKEN = 'id_token';

const SET_FRIENDS = 'SET_FRIENDS';
const SET_NEW_FRIEND = 'SET_NEW_FRIEND';

export const setFriends = friends => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

export const setNewFriend = newFriend => {
  return {
    type: SET_NEW_FRIEND,
    newFriend,
  };
};

export const _createFriend = newFriend => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.post(
          `http://192.168.86.32:8080/api/friends/`,
          newFriend,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.newFriend) {
          dispatch(setNewFriend(data.newFriend));
        }
      }
    } catch (error) {
      console.log('_Create Friend Error: ' + error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    case SET_NEW_FRIEND:
      return [action.newFriend, ...state];
    default:
      return state;
  }
};
