import axios from 'axios';
const setAuthToken = async (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
