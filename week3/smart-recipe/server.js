const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');  // Import authController
const userController = require('./controllers/userController');  // Import userController
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cooksmart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const path = require('path');

// Serve the index.html from the views folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Auth routes
app.post('/auth/signin', authController.signIn);
app.post('/auth/signup', authController.signUp);

// User routes
app.get('/user/:username', userController.getUserProfile);  // Get user profile
app.put('/user/:username', userController.updateUserProfile);  // Update user profile

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
