import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';
import contactContext from '../../context/contact/ContactContext';

import { Link } from 'react-router-dom';
const Navbar = ({ title, icon }) => {
  const authData = React.useContext(AuthContext);
  const { clearContacts } = React.useContext(contactContext);
  const { isAuthenticated, user, logoutUser } = authData;
  const onLogout = (e) => {
    e.preventDefault();
    logoutUser();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li> Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <Link to='/'>
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
        {/* <li>
          <Link to='/about'>About</Link>
        </li> */}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};
export default Navbar;
