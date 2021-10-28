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

    default:
      return state;
  }
};

export default ContactReducer;