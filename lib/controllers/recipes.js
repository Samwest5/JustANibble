const pool = require('../../config/mysqlConnector');
const { BucketURL } = require('../../config/config');
const queryBuilder = require('../builder');

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
    const { queryString, filters } = await queryBuilder(req);
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
    let post = {};
    post.author_id = req.identity.user_id;
    post.recipe_name = req.body.recipeName;
    post.image_path = req.body.image_path;
    post.difficulty = req.body.difficulty;
    post.prep_time = req.body.prepTime + ':00';
    post.cook_time = req.body.cookTime + ':00';
    post.overall_time = req.body.totalTime + ':00';
    if (req.body.tags) {
      if (req.body.tags.includes('isVegan')) {
        post.is_vegan = true;
      }
      if (req.body.tags.includes('isVegetarian')) {
        post.is_vegetarian = true;
      }
      if (req.body.tags.includes('isDairyFree')) {
        post.is_dairy_free = true;
      }
      if (req.body.tags.includes('isGlutenFree')) {
        post.is_gluten_free = true;
      }
      if (req.body.tags.includes('isFavorite')) {
        post.is_favorite = true;
      }
    }
    post.recipe_text = JSON.stringify({
                          'ingredients': req.body.ingredients.replace(/(\r\n|\n|\r)/gm," ").split( /\s*(?:;|$)\s*/),
                          'steps': req.body.steps.replace(/(\r\n|\n|\r)/gm," ").split( /\s*(?:;|$)\s*/)
                        });
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
    res.render('my-recipes', {recipes: recipes});
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
    const queryString = 'SELECT * FROM recipes where recipe_id like ?';
    const result = await pool.query(queryString, req.params.id);
    const recipe = result[0];
    res.render('edit-recipe', {recipe: recipe});
  } catch (err) {
    next(err);
  }
};

exports.recipeEditPOST = async (req, res, next) => {
  try {
    // todo
    res.redirect('/recipes/my');
  } catch (err) {
    next(err);
  }
};

// const queryString = 'UPDATE recipes ' +
// 'SET ' +
//   'is_favorite = TRUE'
// 'WHERE ' +
//   'recipe_id = ? AND author_id = ?';
// const filters = [req.params.id, req.identity.user_name];
// await pool.query(queryString, filters);

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
