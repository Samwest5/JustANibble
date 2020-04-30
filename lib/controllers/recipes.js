const pool = require('../../config/mysqlConnector');
const queryBuilder = require('../builder');

exports.chefsFavoritesGET = async (req, res, next) => {
  try {
    res.render('favorites', {title: "Chef's Favorites"});
  } catch (err) {
    next(err);
  }
};

exports.recipesGET = async (req, res, next) => {
  try {
    res.render('all-recipes', {title: "Recipes"});
  } catch (err) {
    next(err);
  }
};

exports.recipesPOST = async (req, res, next) => {
  try {
    const { queryString, filters } = await queryBuilder(req);
    const results = await pool.query(queryString, filters);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.recipeSingleGET = async (req, res, next) => {
  try {
    res.render('recipe');
  } catch (err) {
    next(err);
  }
};

exports.recipeSinglePOST = async (req, res, next) => {
  try {
    res.send("TODO IMEPLEMENT");
  } catch (err) {
    next(err);
  }
}

exports.recipeEditGET = async (req, res, next) => {
  try {
    res.render('edit-recipe', {title: "Edit Recipe"});
  } catch (err) {
    next(err);
  }
};

exports.recipeCreateGET = async (req, res, next) => {
  try {
    res.render('create-recipe', {title: "Create Recipe"});
  } catch (err) {
    next(err);
  }
};

exports.recipeCreatePOST = async (req, res, next) => {
  try {
    res.render('blah');
  } catch (err) {
    next(err);
  }
};

exports.myRecipesGET = async (req, res, next) => {
  try {
    res.render('my-recipes', {title: "My Favorites"});
  } catch (err) {
    next(err);
  }
};