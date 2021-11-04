import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as test from 'react-router';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
}) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  // const Component = component;
  return (
    <Route
      {...rest}
      render={(props: any) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateRoute;
