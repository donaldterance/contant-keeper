///entrypoint to backend
import express from 'express';
import users from './routes/users.js';
import auth from './routes/auth.js';
import contact from './routes/contact.js';
const app = express();
//process.env.PORT is for production
const PORT = process.env.PORT || 5001;
//define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contact', contact);

app.get('/', (req, res) => {
  res.send({ msg: `Hello world bitch from contact keeper` });
  console.log('after res send');
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
//test change
