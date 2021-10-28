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
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: reducerTypes.ADD_CONTACT, payload: contact });
  };

  //delete contact

  //set current contact

  //clear current contact

  //update current contact

  //filter contacts

  //clear filter

  return (
    // anything we want to access from other components, including state and actions,  goes in value
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
