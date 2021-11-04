export type Contact = {
  _id?: number;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
};
export type ContactState = {
  contacts: Contact[];
  filtered: Contact[];
  current: Contact;

  error?: string | null;
};
