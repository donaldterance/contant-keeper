import * as React from 'react';
import reducerTypes from '../types';
const Alertreducer = (state: any, action: any) => {
  switch (action.type) {
    case reducerTypes.SET_ALERT:
      return [...state, action.payload];
    case reducerTypes.REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default Alertreducer;
