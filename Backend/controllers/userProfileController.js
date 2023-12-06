const User = require('../models/User');

const userProfileController = {
  async getUserProfile(req, res) {
    try {
      const userId = req.user.userId; // Assuming the user ID is retrieved from the JWT token
      const userProfile = await User.findById(userId).select('-password');
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const userId = req.user.userId; // Assuming the user ID is retrieved from the JWT token
      const updates = req.body;

      const updatedUserProfile = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
      if (!updatedUserProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.status(200).json(updatedUserProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = userProfileController;
