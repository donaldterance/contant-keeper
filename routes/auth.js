//login route
//authentication

import express from 'express';
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
router.post('/', (req, res) => {
  res.send({ msg: 'authenticate user' });
  console.log(`made it to auth`);
});

//module.exports = router;
export default router;
