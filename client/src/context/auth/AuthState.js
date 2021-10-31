import { PromiseProvider } from 'mongoose';
import React, { useReducer } from 'react';

import reducerTypes from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

export default AuthState = () => {
  intialState = {};

  const [state, dispatch] = useReducer(AuthReducer, intialState);

  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
