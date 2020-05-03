const pool = require('../../config/mysqlConnector');
const queryBuilder = require('../builder');

exports.chefsFavoritesGET = async (req, res, next) => {
  try {
    res.render('favorites');
  } catch (err) {
    next(err);
  }
};

exports.recipesGET = async (req, res, next) => {
  try {
    res.render('all-recipes');
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

exports.recipeCreateGET = async (req, res, next) => {
  try {
    res.render('create-recipe');
  } catch (err) {
    next(err);
  }
};

exports.recipeCreatePOST = async (req, res, next) => {
  try {
    console.log(req);
    res.render('create-recipe');
  } catch (err) {
    next(err);
  }
};

exports.myRecipesGET = async (req, res, next) => {
  try {
    res.render('my-recipes');
  } catch (err) {
    next(err);
  }
};

exports.myRecipesPOST = async (req, res, next) => {
  try {
    let queryString;
    let results;
    if (req.identity.is_writer) {
      queryString = 'SELECT * FROM recipes WHERE author_id = ?;'
      results = await pool.query(queryString, req.identity.user_id);
      res.json(results);
    }

    // SELECT * FROM sometable a WHERE EXISTS (
    //   SELECT 1 FROM sometable b
    //   WHERE a.relevant_field = b.relevant_field
    //   GROUP BY b.relevant_field
    //   HAVING count(*) > 1)

    // else {
    //   queryString = "SELECT * FROM recipes a WHERE EXISTS (" +
    //                   "SELECT 1 FROM likes b"


    //   queryString = "SELECT * FROM recipes a " +
    //                 "WHERE recipe_id IN " +
    //                 "(SELECT recipe_id FROM likes " +
    //                 "WHERE user_id = ?);";
    //   results = await pool.query(queryString, req.identity.user_id);
    //   res.json(results);
    // }
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
    const post = { user_name: req.identity.user_name, recipe_id: req.body.recipe_id };
    const result = await pool.query('INSERT INTO likes SET ?');
    res.status(200);
    res.send();
  } catch (err) {
    if (err.errno && err.errno === 1062) {
      res.status(400).json('Like already exists');
    }
    next(err);
  }
}

exports.recipeEditGET = async (req, res, next) => {
  try {
    res.render('edit-recipe');
  } catch (err) {
    next(err);
  }
};
