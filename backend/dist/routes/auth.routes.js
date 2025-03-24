import { Router } from 'express';
import authController from '../controllers/user.controller.js'; // Import the user controller
import { body, validationResult } from 'express-validator'; // For validation

const router = Router();

// POST /auth/register: Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.registerUser
);

// POST /auth/login: User login
router.post('/login', authController.loginUser);

export default router;
