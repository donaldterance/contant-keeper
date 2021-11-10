import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import reducerTypes from '../types';
import apiUrls from '../urls';
import axios from 'axios';
const ContactState = (props) => {
  const initialState = {
    contacts: null,
    //clicking edit will set 'current'
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact
  const addContact = async (contact) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
      const addResponse = await axios.post(apiUrls.contacts, contact, config);
      //const res = await axios.get(apiUrls.contacts);
      dispatch({ type: reducerTypes.GET_CONTACTS, payload: addResponse.data });
    } catch (e) {
      dispatch({
        type: reducerTypes.CONTACT_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  const getContacts = async () => {
    try {
      const res = await axios.get(apiUrls.contacts);
      dispatch({ type: reducerTypes.GET_CONTACTS, payload: res.data });
    } catch (e) {
      console.error(`Error occured: ${e.response.data.msg}`);
      dispatch({
        type: reducerTypes.CONTACT_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  const clearContacts = async () => {
    dispatch({ type: reducerTypes.CLEAR_CONTACTS });
  };

  //delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${apiUrls.contacts}/${id}`);
      dispatch({ type: reducerTypes.DELETE_CONTACT, payload: id });
    } catch (e) {
      console.error(`Error occured: ${e.response.data.msg}`);
    }
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
  const updateCurrentContact = async (contact) => {
    try {
      const res = await axios.put(
        `${apiUrls.contacts}/${contact._id}`,
        contact
      );
      dispatch({
        type: reducerTypes.UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (e) {
      console.error(`Error occured: ${e.response.data.msg}`);
    }
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
        loading: state.loading,
        error: state.error,
        addContact,
        getContacts,
        deleteContact,
        clearContacts,
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
