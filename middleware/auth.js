import jwt from 'jsonwebtoken';
import config from 'config';
//only pertains to protected routes
const func = (req, res, next) => {
  //get token from header
  try {
    const token = req.header('authorization');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //we have token in header, we need to decode it
    //the payload(user id) is apart of jwt and will be put into decoded
    //take out user.id
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
export default func;
