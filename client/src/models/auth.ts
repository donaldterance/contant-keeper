type Auth = {
  token: string | null;
  isAuthenticated: boolean;
  user: {} | null;
  //true until we make request and get the resoinse back
  loading: boolean;
  error: string | null;
};
export default Auth;
