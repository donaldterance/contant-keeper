import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return contacts.map((contact) => (
    <ContactItem key={contact.id} contact={contact}></ContactItem>
  ));
};

export default Contacts;
