import axios from "axios";

const SET_MESSAGE = "SET_MESSAGE";

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    message,
  };
};

export default (state = "", action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message;
    default:
      return state;
  }
};
