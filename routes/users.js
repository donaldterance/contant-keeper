//register route
import express from 'express';
const router = express.Router();

// @route  POST api/users
// @desc    Register user
// @access Public
router.post('/', (req, res) => {
  res.send({ msg: 'MADE IT TO USERS' });
  console.log(`made it to users`);
});

//module.exports = router;
export default router;
