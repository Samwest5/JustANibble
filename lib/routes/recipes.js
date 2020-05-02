const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/recipes');

router.get('/', controller.chefsFavoritesGET);

router.get('/recipes', controller.recipesGET);

router.post('/recipes', controller.recipesPOST);

// router.get('/recipes/create', [auth.verifyToken, auth.isWriter, controller.recipeCreateGET]);

/* for me to test create recipe page */
router.get('/recipes/create', [auth.verifyToken, auth.isWriter, controller.recipeCreateGET]);

router.post('/recipes/create', [auth.verifyToken, auth.isWriter, controller.recipeCreatePOST]);

router.get('/recipes/my', [auth.verifyToken, controller.myRecipesGET]);

router.post('/recipes/my', [auth.verifyToken, controller.myRecipesPOST]);

router.get('/recipes/:id', controller.recipeSingleGET);

router.post('/recipes/:id', [auth.verifyToken, controller.recipeSinglePOST]);

router.get('/recipes/:id/edit', [auth.verifyToken, auth.isWriter, controller.recipeEditGET]);

module.exports = router;