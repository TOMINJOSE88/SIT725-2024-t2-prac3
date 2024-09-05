const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');  // Required for socket.io
const socketIo = require('socket.io');  // Import socket.io
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
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
app.get('/user/:username', userController.getUserProfile);
app.put('/user/:username', userController.updateUserProfile);

// Create HTTP server
const server = http.createServer(app);

// Integrate Socket.io with the server
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Broadcast a random number every second
    setInterval(() => {
        socket.emit('number', Math.floor(Math.random() * 100));
    }, 1000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
