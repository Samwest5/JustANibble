const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const s3 = require('../../config/bucketConnector');
const controller = require('../controllers/recipes');

router.get('/', controller.chefsFavoritesGET);

router.get('/recipes', controller.recipesGET);

router.post('/recipes', controller.recipesPOST);

router.get('/recipes/create', [auth.verifyToken, auth.isWriter, controller.recipeCreateGET]);

router.post('/recipes/create', [auth.verifyToken, auth.isWriter, s3.upload.single('recipeImg'), controller.recipeCreatePOST]);

router.get('/recipes/my', [auth.verifyToken, controller.myRecipesGET]);

router.post('/recipes/my', [auth.verifyToken, controller.myRecipesPOST]);

router.get('/recipes/:id', controller.recipeSingleGET);

router.post('/recipes/:id', [auth.verifyToken, controller.recipeSinglePOST]);

router.get('/recipes/:id/edit', [auth.verifyToken, auth.isWriter, controller.recipeEditGET]);

router.post('/recipes/:id/edit', [auth.verifyToken, auth.isWriter, controller.recipeEditPOST]);

router.post('/recipes/:id/delete', [auth.verifyToken, auth.isWriter, controller.getImagePath, s3.delete, controller.recipeDeletePOST]);

module.exports = router;