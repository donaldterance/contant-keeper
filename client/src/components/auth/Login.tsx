import * as React from 'react';
import { useState, FormEvent, ChangeEvent } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Login Submit`);
    setUser({
      email: '',
      password: '',
    });
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary text-underline'>Login</span>
      </h1>
      <form action='' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
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

export default Login;
