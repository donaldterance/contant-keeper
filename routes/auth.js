//login route
//authentication

import express from 'express';
import config from 'config';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const router = express.Router();

// @route  GET api/auth
// @desc   Get logged in user
// @access Private
router.get('/', (req, res) => {
  res.send({ msg: 'Get logged in user' });
  console.log(`made it to auth`);
});

// @route  POST api/auth
// @desc  Authenticate user
// @access Public
router.post(
  '/',
  [check('email').isEmail(), check('password', 'Password required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      //checks password
      //compares password receieved from user to password retreived from database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id } };
      //sign token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          console.log(`this is the token: ${JSON.stringify({ token })}`);
          res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      return res.status(500).send(`Server Error`);
    }
  }
);

//module.exports = router;
export default router;
