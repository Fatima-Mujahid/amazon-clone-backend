import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from './models/user.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/product.js';

dotenv.config({ path: '.env' });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
  })
);

mongoose.connect(process.env.CONNECTION_URL);

passport.use(
  'local',
  new passportLocal.Strategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err, false, { message: err.message });
        }
        if (!user) {
          return done(null, false, { message: 'User Not Registered' });
        }
        if (!User.checkPassword(password, user.password)) {
          return done(null, false, { message: 'Incorrect Password' });
        }
        return done(null, user, { message: 'Login Successful' });
      });
    }
  )
);

app.use('/user', userRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
