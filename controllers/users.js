import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const registerUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(200).json({
        message: 'User Created Successfully',
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, success: false });
    });
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err | !user) {
      res.status(500).json({ message: info.message, success: false });
    } else {
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY);
      const { password, ...newUser } = user.toObject();
      res.status(200).json({
        message: 'Login Successful',
        success: true,
        data: newUser,
        token,
      });
    }
  })(req, res, next);
};

export { registerUser, loginUser };
