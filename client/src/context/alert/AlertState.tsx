import { useReducer } from 'react';
import reducerTypes from '../types';
import AlertContext from './AlertContext';
import Alertreducer from './AlertReducer';
import * as uuid from 'uuid';

const AlertState = (props: any) => {
  const initialState: any = [
    // { msg: '', type: '', id: '0' }
  ];
  const [state, dispatch] = useReducer(Alertreducer, initialState);

  //Set Alert
  const setAlert = (msg: string, type: any, timeout = 3000) => {
    const id = uuid.v4();
    dispatch({ type: reducerTypes.SET_ALERT, payload: { msg, type, id } });
    console.log(`made it to set alert!`);
    setTimeout(
      () => dispatch({ type: reducerTypes.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
