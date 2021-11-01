import { useReducer } from 'react';

import reducerTypes from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

export const AuthState = (props: any) => {
  const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    //true until we make request and get the resoinse back
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, intialState);

  //Load User:checks with user is logged in

  //Register User

  //Login User

  //Logout: destroy token

  //Clear <Errors></Errors>

  return (
    <AuthContext.Provider
      value={
        {
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          loading: state.loading,
          error: state.error,
        } as any
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
