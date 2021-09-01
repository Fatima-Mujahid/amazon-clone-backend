import express from 'express';
import { registerUser, loginUser } from '../controllers/users.js';

const router = express.Router({ mergeParams: true });

//REGISTER ROUTE
/**
 * @route   POST /user/register
 * @desc    Register user
 * @body    {email, password}
 */
router.post('/register', registerUser);

//LOGIN ROUTE
/**
 * @route   POST /user/login
 * @desc    Login user
 * @body    {email, password}
 */
router.post('/login', loginUser);

export default router;
