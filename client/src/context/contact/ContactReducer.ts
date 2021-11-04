import reducerTypes from '../types';
import Action from '../../models/action';
import { Contact, ContactState } from '../../models/contact';
const ContactReducer = (state: ContactState, action: Action) => {
  switch (action.type) {
    case reducerTypes.ADD_CONTACT:
      //backend not connected yet, when conncted we would display response
      // so set contacts directly from payload
      console.log(`data in reducer: ${JSON.stringify(action.payload)}`);
      //action.payload['id'] = action.payload['_id'];
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        filtered: null,
      };
    case reducerTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact: Contact) => contact._id !== action.payload
        ),
        filtered:
          state.filtered === null
            ? null
            : state.filtered.filter(
                (contact: Contact) => contact._id !== action.payload
              ),
      };
    case reducerTypes.SET_CURRENT:
      return { ...state, current: action.payload };
    case reducerTypes.CLEAR_CURRENT:
      return { ...state, current: null };
    case reducerTypes.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact: Contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    case reducerTypes.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact: Contact) => {
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
    case reducerTypes.CONTACT_ERROR:
      return { ...state, error: action.payload };
    case reducerTypes.CLEAR_CURRENT:
      return state;
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
