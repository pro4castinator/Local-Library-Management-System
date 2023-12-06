// userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const userController = {
  async registerUser(req, res) {
    try {
      const { name, email, password} = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error: error.message }); // Send error details in the response
    }
    
  },
  

  async getAllUsers(req, res) {
    try {
      const currentUser = req.user; // Assuming user details are extracted from the token

      // Check if the user is an Admin
      if (currentUser.role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // If Admin, proceed to get all users
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async updateUser(req, res) {
    try {
      const currentUser = req.user;
      const userId = req.params.id;
      const updates = req.body;

      // Check if the user is an Admin or the same user being updated
      if (currentUser.role === 'Admin' || currentUser._id === userId) {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const currentUser = req.user;
      const userId = req.params.id;

      // Check if the user is an Admin
      if (currentUser.role === 'Admin') {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
        expiresIn: '1h', // token expiration time
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
  

  async getUserProfile(req, res) {
    try {
      const currentUser = req.user;
      const userId = req.params.id;

      // Check if the user is an Admin or the same user whose profile is being accessed
      if (currentUser.role === 'Admin' || currentUser._id === userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = userController;
