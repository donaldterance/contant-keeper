//advances CRUD
import express from 'express';
const router = express.Router();

// @route  GET api/contacts
// @desc    Get logged in user contacts
// @access Private
router.get('/', (req, res) => {
  res.send({ msg: 'get all contacts' });
  console.log(`made it to contact`);
});

// @route  POST api/contacts
// @desc    Add new contact
// @access Private
router.post('/', (req, res) => {
  res.send({ msg: 'add contact!!!' });
  console.log(`made it to contact`);
});

// @route  PUT api/contacts/:id
// @desc    update contact
// @access Private
router.put('/:id', (req, res) => {
  res.send({ msg: 'Update Contact' });
  console.log(`made it to contact`);
});

// @route  DELETE api/contacts/:id
// @desc    delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send({ msg: 'Delete Contact' });
  console.log(`made it to contact`);
});

//module.exports = router;
export default router;
