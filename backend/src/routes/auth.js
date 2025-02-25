import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Register user
router.post('/register',
  [
    body('email').isEmail().withMessage('Geçerli bir email adresi giriniz'),
    body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
    body('firstName').notEmpty().withMessage('Ad alanı zorunludur'),
    body('lastName').notEmpty().withMessage('Soyad alanı zorunludur'),
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: 'Bu email adresi zaten kayıtlı' });
      }

      // Create new user
      user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });

      await user.save();

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Login user
router.post('/login',
  [
    body('email').isEmail().withMessage('Geçerli bir email adresi giriniz'),
    body('password').notEmpty().withMessage('Şifre alanı zorunludur'),
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
      }

      // Check password
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Hatalı şifre' });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
