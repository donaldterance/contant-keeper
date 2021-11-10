///entrypoint to backend
import express from 'express';
import users from './routes/users.js';
import auth from './routes/auth.js';
import contact from './routes/contacts.js';
import connectdb from './config/db.js';
const app = express();

//Connect Database
connectdb();

//init middleware
app.use(express.json({ extended: false }));

//process.env.PORT is for production
const PORT = process.env.PORT || 5001;
//define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contact', contact);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
//test change
