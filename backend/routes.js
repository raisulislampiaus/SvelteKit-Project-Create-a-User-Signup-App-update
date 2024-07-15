const express = require('express');
const router = express.Router();
const User = require('./userModel');
const validator = require('validator');

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, surname, emailOrMobile, password, dateOfBirth, gender } = req.body;

  if (!firstName || !surname || !emailOrMobile || !password || !dateOfBirth || !gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if emailOrMobile is an email or mobile number
  const isEmail = validator.isEmail(emailOrMobile);
  const isMobile = validator.isMobilePhone(emailOrMobile, 'any', { strictMode: false });

  if (!isEmail && !isMobile) {
    return res.status(400).json({ message: 'Invalid email or mobile number' });
  }

  try {
    // Check if emailOrMobile already exists
    const existingUser = await User.findOne({ emailOrMobile });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number already exists' });
    }

    const newUser = new User({ firstName, surname, emailOrMobile, password, dateOfBirth, gender });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
