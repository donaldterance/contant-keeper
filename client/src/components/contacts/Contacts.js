import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h4>Please Add A Contact</h4>;
  }

  return (
    <Fragment>
      {filtered
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
          ))}
    </Fragment>
  );
};

export default Contacts;
