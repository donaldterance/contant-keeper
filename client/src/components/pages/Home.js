import React, { Fragment } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div className='contact-form'>
        <Fragment>
          <ContactForm />
        </Fragment>
      </div>
      <div className='contacts'>
        <Contacts></Contacts>
      </div>
    </div>
  );
};

export default Home;
