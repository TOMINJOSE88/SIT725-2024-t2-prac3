// controllers/authController.js
import * as UserModule from '../models/User.js';
const User = UserModule.default;

export const signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            user = new User({ username, password });
            await user.save();
            res.json({ message: 'Sign up successful', username: user.username });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                res.json({ message: 'Sign in successful', username: user.username });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};