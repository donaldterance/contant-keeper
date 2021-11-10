import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  React.useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  const getContactList = (contactArray) => {
    return (
      <Fragment>
        {contactArray !== null && !loading ? (
          <TransitionGroup className='contact-list'>
            {contactArray.map((contact) => {
              const itemRef = React.createRef();
              return (
                <CSSTransition
                  nodeRef={itemRef}
                  key={contact._id}
                  classNames='item'
                  timeout={400}
                >
                  <div ref={itemRef}>
                    <ContactItem contact={contact} />
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {filtered ? getContactList(filtered) : getContactList(contacts)}
    </Fragment>
  );
};

export default Contacts;
