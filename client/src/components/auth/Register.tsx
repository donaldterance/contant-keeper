import * as React from 'react';
import { useState, FormEvent, ChangeEvent } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      console.log(`fire alert`);
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords must match', 'danger');
    } else {
      console.log(`Register Submit`);
    }

    // setUser({
    //   name: '',
    //   email: '',
    //   password: '',
    //   password2: '',
    // });
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary text-underline'>Register</span>
      </h1>
      <form action='' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
