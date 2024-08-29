import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    n_ingredients: {
        type: Number,
        required: true
    },
    // Add other fields if necessary, such as cooking instructions, categories, etc.
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;