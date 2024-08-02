const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Route to handle recipe recommendations
app.get('/recommend', (req, res) => {
    // Sample static data
    const recipes = [
        { id: 1, name: 'Spaghetti Bolognese', ingredients: ['spaghetti', 'meat', 'tomato sauce'] },
        { id: 2, name: 'Chicken Curry', ingredients: ['chicken', 'curry sauce', 'rice'] },
        { id: 3, name: 'Beef Tacos', ingredients: ['beef', 'taco shells', 'lettuce', 'cheese'] },
    ];
    res.json(recipes);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});