import reducerTypes from '../types';

const ContactReducer = (state, action) => {
  switch (action.type) {
    case reducerTypes.ADD_CONTACT:
      //backend not connected yet, when conncted we would display response
      // so set contacts directly from payload
      return { ...state, contacts: [...state.contacts, action.payload] };
    case reducerTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case reducerTypes.SET_CURRENT:
      return { ...state, current: action.payload };
    case reducerTypes.CLEAR_CURRENT:
      return { ...state, current: null };
    case reducerTypes.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    default:
      return state;
  }
};

export default ContactReducer;
