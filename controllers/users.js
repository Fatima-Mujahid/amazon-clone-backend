import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const registerUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.status(500).json({ message: err.message, success: false });
    } else {
      res.status(200).json({
        message: 'User Created Successfully',
        success: true,
      });
    }
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err | !user) {
      res.status(500).json({ message: info.message, success: false });
    } else {
      const { password, ..._user } = user.toObject();
      const token = jwt.sign(_user, process.env.JWT_SECRET_KEY);
      res.status(200).json({
        message: 'Login Successful',
        success: true,
        data: _user,
        token,
      });
    }
  })(req, res, next);
};

export { registerUser, loginUser };
