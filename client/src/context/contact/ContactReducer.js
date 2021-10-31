import reducerTypes from '../types';

const ContactReducer = (state, action) => {
  switch (action.type) {
    case reducerTypes.ADD_CONTACT:
      //backend not connected yet, when conncted we would display response
      // so set contacts directly from payload
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        filtered: null,
      };
    case reducerTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        filtered:
          state.filtered === null
            ? null
            : state.filtered.filter((contact) => contact.id !== action.payload),
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
    case reducerTypes.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const { name, email } = contact;
          let show = false;
          const testString = `${name}${email}`.toLowerCase();
          if (testString.includes(action.payload.toLowerCase())) {
            show = true;
          } else {
            show = false;
          }

          return show;
        }),
      };
    case reducerTypes.CLEAR_FILTER:
      console.log(`filter cleared!`);
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};

export default ContactReducer;
