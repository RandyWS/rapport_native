import axios from 'axios';
import {setSingleFriend} from './userSingleFriend';

const SET_SINGLE_CONTACT = 'SET_SINGLE_CONTACT';
const RESET_SINGLE_CONTACT = 'RESET_SINGLE_CONTACT';

export const setSingleContact = singleContact => {
  return {
    type: SET_SINGLE_CONTACT,
    singleContact,
  };
};

export const resetSingleContact = () => {
  return {
    type: RESET_SINGLE_CONTACT,
    singleContact: {},
  };
};

export const getSingleContact = contactId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/contacts/authenticated/byContactId/${contactId}`,
      );
      dispatch(setSingleContact(data.singleContact));
      dispatch(setSingleFriend(data.singleContact.friend));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createContact = (contact, history) => {
  return async dispatch => {
    try {
      console.log(contact);
      const {data} = await axios.post(`/api/contacts/authenticated`, contact);
      dispatch(getSingleContact(data.singleContact.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_CONTACT:
      return action.singleContact;
    case RESET_SINGLE_CONTACT:
      return action.singleContact;
    default:
      return state;
  }
};
