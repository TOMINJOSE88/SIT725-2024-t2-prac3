import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { signIn, signUp } from './controllers/authController.js';  // Named imports
import { getUserProfile, updateUserProfile } from './controllers/userController.js';  // Named imports
import { getRecipes, getRecipeById } from './controllers/recipeController.js';  // Named imports

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to MongoDB
(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cooksmart', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
    }
})();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the index.html from the views folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Auth routes
app.post('/auth/signin', signIn);
app.post('/auth/signup', signUp);

// User routes
app.get('/user/:username', getUserProfile);  // Get user profile
app.put('/user/:username', updateUserProfile);  // Update user profile

// Recipe routes
app.get('/recipes', getRecipes);  // Get all recipes
app.get('/recipes/:id', getRecipeById);  // Get recipe by ID

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});