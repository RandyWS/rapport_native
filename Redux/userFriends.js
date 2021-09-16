import axios from "axios";

const SET_USER_FRIENDS = "SET_USER_FRIENDS";

export const setUserFriends = (userFriends) => {
  return {
    type: SET_USER_FRIENDS,
    userFriends,
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_USER_FRIENDS:
      return action.userFriends;
    default:
      return state;
  }
};
