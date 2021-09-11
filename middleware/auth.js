import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Not Authorized, Token Failed',
        success: false,
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: 'Not Authorized, No Token',
      success: false,
    });
  }
};

export default protect;
