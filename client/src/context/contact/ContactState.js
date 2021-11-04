import React, { useReducer } from 'react';
//generate random ID
import * as uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import reducerTypes from '../types';
import apiUrls from '../urls';
import axios from 'axios';
const ContactState = (props) => {
  const initialState = {
    // contacts: [
    //   {
    //     id: 1,
    //     name: 'Test Contact Name',
    //     email: 'testEmail@email.com',
    //     phone: '123-456-7890',
    //     type: 'personal',
    //   },
    //   {
    //     id: 2,
    //     name: 'Test Contact Two',
    //     email: 'testTwo@email.com',
    //     phone: null,
    //     type: 'professional',
    //   },
    //   {
    //     id: 3,
    //     name: 'Test Three',
    //     email: null,
    //     phone: '123-789-4578',
    //     type: 'personal',
    //   },
    // ],
    contacts: [],
    //clicking edit will set 'current'
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact
  const addContact = async (contact) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.post(apiUrls.contacts, contact, config);
    console.log(`this is contact info: ${JSON.stringify(res.data)}`);
    dispatch({ type: reducerTypes.ADD_CONTACT, payload: res.data });
    try {
    } catch (e) {
      dispatch({ type: reducerTypes.CONTACT_ERROR, payload: e.rresponse.msg });
    }
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
        error: state.error,
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
