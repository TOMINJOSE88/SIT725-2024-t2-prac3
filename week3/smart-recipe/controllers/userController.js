// controllers/userController.js
const User = require('../models/User');

module.exports = {
    getUserProfile: async (req, res) => {
        const { username } = req.params;
        try {
            const user = await User.findOne({ username });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUserProfile: async (req, res) => {
        const { username } = req.params;
        const { password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user) {
                if (password) {
                    user.password = password;  // Assume bcrypt middleware handles hashing
                }
                await user.save();
                res.json({ message: 'User profile updated' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    // Add more user-related methods here as needed
};