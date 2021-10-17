//advances CRUD
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import authMid from '../middleware/auth.js';
import ContactModel from '../models/contactModel.js';
import * as val from '../validator.js';

//auth middleware
router.use(authMid);

// @route  GET api/contacts
// @desc    Get logged in user contacts
// @access Private
router.get('/', async (req, res) => {
  // res.send({ msg: 'get all contacts' });
  // console.log(`made it to contact`);
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    const contacts = await ContactModel.find({ user: req.user.id });
    console.log(`this is contacts ${JSON.stringify(contacts)}`);
    res.json({
      count: contacts.length,
      contacts,
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/contacts
// @desc    Add new contact
// @access Private
router.post(
  '/',
  val.validationRules('contacts'),

  async (req, res) => {
    // res.send({ msg: 'add contact!!!' });
    // console.log(`made it to contact`);
    try {
      const { name, email, phone, type } = req.body;
      let newContact = new ContactModel({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      console.log(`this is saved contact data: ${newContact}`);
      res.json(contact);
    } catch (e) {
      console.error(e.message);
      res.status(500).send(`Server Error`);
    }
  }
);

// @route  PUT api/contacts/:id
// @desc    update contact
// @access Private
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    let contact = await ContactModel.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    //make sure user can't update another users contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unathorized' });
    }
    contact = await ContactModel.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/contacts/:id
// @desc    delete contact
// @access Private
router.delete('/:id', async (req, res) => {
  // res.send({ msg: 'Delete Contact' });
  // console.log(`made it to contact`);
  try {
    let contact = await ContactModel.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    //make sure user can't update another users contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unathorized' });
    }
    contact = await ContactModel.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

//module.exports = router;
export default router;
