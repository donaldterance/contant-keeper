import React, { Fragment } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const authData = React.useContext(AuthContext);
  React.useEffect(() => {
    console.log('called loadUser from home.js');
    authData.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div className='contact-form'>
        <Fragment>
          <ContactForm />
        </Fragment>
      </div>
      <div className='contacts'>
        <ContactFilter />
        <Contacts></Contacts>
      </div>
    </div>
  );
};

export default Home;
