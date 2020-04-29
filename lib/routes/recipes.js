const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes');

router.get('/', controller.chefsFavoritesGET);

router.get('/recipes', controller.recipesGET);

router.get('/recipes/create', controller.recipeCreateGET);

router.post('/recipes/create', controller.recipeCreatePOST);

router.get('/recipes/my', controller.myRecipesGET);

router.get('/recipes/:id', controller.recipeSingleGET);

router.get('/recipes/:id/edit', controller.recipeEditGET);

module.exports = router; 