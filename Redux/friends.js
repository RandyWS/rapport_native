import axios from 'axios';

const SET_FRIENDS = 'SET_FRIENDS';

export const setFriends = friends => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    default:
      return state;
  }
};
