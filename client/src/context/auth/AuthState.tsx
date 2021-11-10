import { useReducer } from 'react';
import axios from 'axios';
import reducerTypes from '../types';
import apiURLS from '../urls';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';

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
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const url = apiURLS.authUser;
      const res = await axios.get(url);
      dispatch({ type: reducerTypes.USER_LOADED, payload: res.data });
    } catch (e) {
      dispatch({ type: reducerTypes.AUTH_ERROR });
    }
  };

  //Register User
  const registerUser = async (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const url = apiURLS.registerUser;
      const res = await axios.post(url, formData, config);
      dispatch({ type: reducerTypes.REGITER_SUCCESS, payload: res.data });
      loadUser();
    } catch (e: any) {
      console.error(`Error occured: ${e.response.data.msg}`);
      dispatch({
        type: reducerTypes.REGISTER_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //Login User
  const loginUser = async (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const url = apiURLS.authUser;
      const res = await axios.post(url, formData, config);
      dispatch({ type: reducerTypes.LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (e: any) {
      dispatch({
        type: reducerTypes.LOGIN_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //Logout: destroy token
  const logoutUser = async () => {
    dispatch({ type: reducerTypes.LOGOUT });
  };

  //Clear errors
  const clearErrors = async () => {
    dispatch({ type: reducerTypes.CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={
        {
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          loading: state.loading,
          error: state.error,
          registerUser,
          loginUser,
          loadUser,
          logoutUser,
          clearErrors,
        } as any
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
