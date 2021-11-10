import React, { useContext, useRef, useEffect } from 'react';
import contactContext from '../../context/contact/ContactContext';
const ContactFilter = () => {
  const context = useContext(contactContext);
  const { filterContacts, clearFilter, filtered } = context;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null || filtered.length === 0) {
      text.current.value = '';
    } // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
