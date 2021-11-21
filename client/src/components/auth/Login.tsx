import * as React from 'react';
import { useState, FormEvent, ChangeEvent } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = (props: any) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const { setAlert } = React.useContext(AlertContext);
  const { loginUser, error, clearErrors, isAuthenticated } =
    React.useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter credentials', 'danger');
    } else {
      loginUser({ email, password });
    }

    // setUser({
    //   email: '',
    //   password: '',
    // });
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
            required
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
