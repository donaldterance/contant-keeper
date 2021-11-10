export type Contact = {
  _id?: number;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
};
export type ContactState = {
  contacts: Contact[] | null;
  filtered: Contact[] | null;
  current: Contact | null;
  loading?: boolean;

  error?: string | null;
};
