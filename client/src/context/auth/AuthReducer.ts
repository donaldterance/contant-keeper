import Auth from '../../models/auth';
import Action from '../../models/action';
import reducerTypes from '../types';

const AuthReducer = (state: Auth, action: Action) => {
  switch (action.type) {
    case reducerTypes.LOGIN_SUCCESS:
    case reducerTypes.REGITER_SUCCESS:
      //add token to localStorage
      //payload:token
      localStorage.setItem('token', action.payload.token);
      return (state = {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      });
    case reducerTypes.LOGIN_FAIL:
    case reducerTypes.AUTH_ERROR:
    case reducerTypes.REGISTER_FAIL:
      //payload:msg
      //remove token from localStorage
      localStorage.removeItem('token');
      return (state = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      });

    case reducerTypes.USER_LOADED:
      //payload:user{}
      return (state = {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      });

    case reducerTypes.LOGOUT:
      localStorage.removeItem('token');
      return (state = {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        token: null,
        error: null,
      });
    case reducerTypes.CLEAR_ERRORS:
      return (state = { ...state, error: null });
    default:
      return state;
  }
};

export default AuthReducer;
