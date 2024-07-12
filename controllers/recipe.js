import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        const recipes = await query('SELECT * FROM recipes');
        res.json(recipes);
    },
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        const recipe = await query('SELECT * FROM recipes WHERE id = ?', [id]);
        res.json(recipe);
    },
    postRecipe: async (req, res) => {
        const { name, description } = req.body;
        const newRecipe = await query(
            'INSERT INTO recipes (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.json({ id: newRecipe.insertId, name, description });
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        await query(
            'UPDATE recipes SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
        res.json({ id, name, description });
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        await query('DELETE FROM recipes WHERE id = ?', [id]);
        res.json({ message: 'Recipe deleted successfully' });
    }
};

export default recipeControllers;
