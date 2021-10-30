import React, { useReducer } from 'react';
//generate random ID
import * as uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import reducerTypes from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Test Contact Name',
        email: 'testEmail@email.com',
        phone: '123-456-7890',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Test Contact Two',
        email: 'testTwo@email.com',
        phone: null,
        type: 'professional',
      },
      {
        id: 3,
        name: 'Test Three',
        email: null,
        phone: '123-789-4578',
        type: 'personal',
      },
    ],
    //clicking edit will set 'current'
    current: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: reducerTypes.ADD_CONTACT, payload: contact });
  };

  //delete contact
  const deleteContact = (id) => {
    dispatch({ type: reducerTypes.DELETE_CONTACT, payload: id });
  };

  //set current contact
  const setCurrentContact = (contact) => {
    dispatch({ type: reducerTypes.SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: reducerTypes.CLEAR_CURRENT });
  };

  //update current contact
  const updateCurrentContact = (contact) => {
    dispatch({ type: reducerTypes.UPDATE_CONTACT, payload: contact });
  };

  //filter contacts
  const filterContacts = (searchFilter) => {
    dispatch({ type: reducerTypes.FILTER_CONTACTS, payload: searchFilter });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: reducerTypes.CLEAR_FILTER });
  };

  return (
    // anything we want to access from other components, including state and actions,  goes in value
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateCurrentContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
