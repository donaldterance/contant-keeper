import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
}) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
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
