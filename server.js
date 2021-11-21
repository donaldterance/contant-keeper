///entrypoint to backend
import express from 'express';
import users from './routes/users.js';
import auth from './routes/auth.js';
import contact from './routes/contacts.js';
import connectdb from './config/db.js';
import path from 'path';
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

//serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
//test change
