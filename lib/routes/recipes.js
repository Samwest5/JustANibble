const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes');

router.get('/', controller.chefsFavoritesGET);

router.get('/recipes', controller.recipesGET);

router.get('/recipes/:id', controller.recipeSingleGET);

router.get('/recipes/:id/edit', controller.recipeEditGET);

router.get('/recipes/create', controller.recipeCreateGET);

router.get('/recipes/my', controller.myRecipesGET);

module.exports = router;