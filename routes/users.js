//register route
import express from 'express';
import config from 'config';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
const userRouter = express.Router();
//use express validator to limit incoming data and validate required propeties are listed

// @route  POST api/users
// @desc    Register user
// @access Public
userRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //res.send({ msg: 'MADE IT TO USERS' });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await UserModel.findOne({ email });
      if (user) {
        console.log('User already exists');
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new UserModel({ name, email, password });
      console.log(`this is user model: ${JSON.stringify(user)}`);

      const salt = await bcrypt.genSalt(10);
      console.log(`this is salt :${salt}`);
      user.password = await bcrypt.hash(password, salt);
      console.log(`this is user password :${user.password}`);
      await user.save();
      //object fro jwt
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
      //return res.send(`User Save`);
    } catch (e) {
      console.error(e.message);
      return res.status(500).send('Server Error');
    }

    //res.send(req.body);

    console.log(`made it to users`);
  }
);

//module.exports = router;
export default userRouter;
