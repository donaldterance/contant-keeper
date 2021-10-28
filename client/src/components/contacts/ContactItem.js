import React from 'react';
import contactContext from '../../context/contact/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const { name, id, email, phone, type } = contact;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={`badge ${
            type === 'professional' ? 'badge-success' : 'badge-primary'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li className='email'>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li className='phone'>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p className='buttons'>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
