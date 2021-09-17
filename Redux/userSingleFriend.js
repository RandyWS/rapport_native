import axios from 'axios';

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
    singleFriend,
  };
};

export const _createFriend = (friend, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/friends/authenticated`, friend);
      dispatch(setSingleFriend(data.singleFriend));
      const path = `/user/${friend.user.userName}`;
      history.push(path);
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
