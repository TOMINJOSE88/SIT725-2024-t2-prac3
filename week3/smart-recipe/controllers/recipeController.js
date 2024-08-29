import Recipe from '../models/recipeModel.js';

// Get all recipes
export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ id: req.params.id });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};