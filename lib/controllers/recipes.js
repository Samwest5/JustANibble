const pool = require('../../config/mysqlConnector');
const { BucketURL } = require('../../config/config');
const builder = require('../builder');

exports.chefsFavoritesGET = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes WHERE is_favorite = TRUE';
    const recipes = await pool.query(queryString);
    res.render('favorites', {recipes: recipes, bucketurl: BucketURL});
  } catch (err) {
    next(err);
  }
};

exports.recipesGET = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes';
    const recipes = await pool.query(queryString);
    res.render('all-recipes', {recipes: recipes, bucketurl: BucketURL});
  } catch (err) {
    next(err);
  }
};

exports.recipesPOST = async (req, res, next) => {
  try {
    const { queryString, filters } = await builder.queryBuilder(req);
    const recipes = await pool.query(queryString, filters);
    res.render('all-recipes', {recipes: recipes, bucketurl: BucketURL});
  } catch (err) {
    next(err);
  }
};

exports.recipeCreateGET = async (req, res, next) => {
  try {
    res.render('create-recipe');
  } catch (err) {
    next(err);
  }
};

exports.recipeCreatePOST = async (req, res, next) => {
  try {
    let post = await builder.postBuilder(req, false);
    await pool.query('INSERT INTO recipes SET ?', post);
    res.redirect('/recipes/my');
  } catch (err) {
    next(err);
  }
};

exports.myRecipesGET = async (req, res, next) => {
  try {
    let queryString;
    let recipes;
    if (req.identity.is_writer) {
      queryString = 'SELECT * FROM recipes WHERE author_id = ?;'
      recipes = await pool.query(queryString, req.identity.user_id);
    }
    else {
      queryString = 'SELECT * FROM recipes ' +
                    'JOIN likes on likes.recipe_id=recipes.recipe_id ' +
                    'WHERE likes.user_id = ?;'
      recipes = await pool.query(queryString, req.identity.user_id);
    }
    res.render('my-recipes', {recipes: recipes, bucketurl: BucketURL});
  } catch (err) {
    next(err);
  }
};

exports.recipeSingleGET = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes where recipe_id like ?';
    const result = await pool.query(queryString, req.params.id);
    const recipe = result[0];
    res.render('recipe', {recipe: recipe, bucketurl: BucketURL});
  } catch (err) {
    next(err);
  }
};

exports.recipeSinglePOST = async (req, res, next) => {
  try {
    if (req.identity.is_writer) {
      res.redirect('/recipes/'+ req.params.id + '/edit');
    }
    else {
      const queryString = 'SELECT * FROM likes WHERE user_id LIKE ? AND recipe_id LIKE ?';
      const result = await pool.query(queryString, [req.identity.user_id, req.params.id]);
      if (result.length == 0) {
        const post = { user_id: req.identity.user_id, recipe_id: req.params.id };
        await pool.query('INSERT INTO likes SET ?', post);
      }
      res.redirect('/recipes/'+ req.params.id);      
    }
  } catch (err) {
    next(err);
  }
};

exports.recipeEditGET = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes where recipe_id = ?';
    const result = await pool.query(queryString, req.params.id);
    const recipe = result[0];
    res.render('edit-recipe', {recipe: recipe});
  } catch (err) {
    next(err);
  }
};

exports.recipeEditPOST = async (req, res, next) => {
  try {
    let post = await builder.postBuilder(req, true);
    await pool.query('UPDATE recipes SET ? WHERE recipe_id = ?', [post, req.params.id]);
    res.redirect('/recipes/my');
  } catch (err) {
    next(err);
  }
};

exports.getImagePath = async (req, res, next) => {
  try {
    const queryString = 'SELECT image_path FROM recipes WHERE recipe_id = ?';
    const result = await pool.query(queryString, req.params.id);
    const image_path = result[0].image_path;
    req.body.image_path = image_path;
    next();
  } catch (err) {
    next(err);
  }
}

exports.recipeDeletePOST = async (req, res, next) => {
  try {
    const queryString = 'DELETE FROM recipes WHERE recipe_id = ?';
    await pool.query(queryString, req.params.id);
    res.redirect('/recipes/my');
  } catch (err) {
    next(err);
  }
};

/*
How To: 
Add Code to master from feature branch

e.g. garrett = feature_branch
master = master

*/

