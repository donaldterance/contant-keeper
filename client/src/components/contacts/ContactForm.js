import { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrentContact, updateCurrentContact } =
    contactContext;
  //instead of having individual field with their own state,
  // use single state, a contact object that has all the fields
  //default type: personal
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  //use useEffect to set contactForm using data in {current} as soon as page is loaded/mounted
  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;
  const onSubmit = (e) => {
    e.preventDefault();
    if (!!!current) {
      addContact(contact);
    } else {
      updateCurrentContact(contact);
      clearCurrentContact();
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrentContact();
  };
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });
  return (
    <form action='' onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name || ''}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email || ''}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone || ''}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{'    '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
