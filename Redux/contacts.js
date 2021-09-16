import axios from "axios";

const SET_CONTACTS = "SET_CONTACTS";
const RESET_CONTACTS = "RESET_CONTACTS";

export const setContacts = (contacts) => {
  return {
    type: SET_CONTACTS,
    contacts,
  };
};

export const resetContacts = () => {
  return {
    type: RESET_CONTACTS,
    contacts: [],
  };
};

export const getContacts = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/contacts/authenticated/byUserId/${userId}`
      );
      dispatch(setContacts(data.contacts));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return action.contacts;
    case RESET_CONTACTS:
      return action.contacts;
    default:
      return state;
  }
};
