// controllers/authController.js
const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  
  // Validate input data
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      errors: [{ field: 'input', message: 'All fields are required' }]
    });
  }
  
  try {
    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({
        errors: [{ field: 'email', message: 'Email already exists' }]
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({ 
      userId: `user_${Date.now()}`,
      firstName, 
      lastName, 
      email, 
      password: hashedPassword, 
      phone 
    });

    // Generate JWT token
    const token = generateToken(user);

    // Return successful response
    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input data
    if (!email || !password) {
      return res.status(422).json({
        errors: [{ field: 'input', message: 'Email and password are required' }]
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401,
      });
    }

    // Compare password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401,
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return successful response
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Login unsuccessful',
      statusCode: 400,
    });
  }
};
