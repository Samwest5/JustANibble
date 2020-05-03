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
    // todo fix queryBuilder
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

// recipe_id INT AUTO_INCREMENT PRIMARY KEY,
// author_id INT NOT NULL,
//   recipe_name VARCHAR(255) NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   image_path VARCHAR(255) NOT NULL,
//   prep_time TIME NOT NULL,
//   cook_time TIME NOT NULL,
//   overall_time TIME NOT NULL,
//   difficulty VARCHAR(6) NOT NULL,
//   is_vegan BOOLEAN NOT NULL DEFAULT FALSE,
//   is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
//   is_dairy_free BOOLEAN NOT NULL DEFAULT FALSE,
//   is_gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
//   is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
//   recipe_text JSON NOT NULL,

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
    const queryString = 'SELECT * FROM recipes where recipe_id like ?';
    const result = pool.query(queryString, req.params.id);
    const recipe = result[0];
    res.render('recipe', recipe);
  } catch (err) {
    next(err);
  }
};

exports.recipeSinglePOST = async (req, res, next) => {
  try {
    if (req.identity.is_writer) {
      const queryString = 'UPDATE recipes ' +
                          'SET ' +
                            'is_favorite = TRUE'
                          'WHERE ' +
                            'recipe_id = ? AND author_id = ?';
      const filters = [req.params.id, req.identity.user_name];
      await pool.query(queryString, filters);
    }
    else {
      const post = { user_name: req.identity.user_name, recipe_id: req.params.id };
      await pool.query('INSERT INTO likes SET ?', post);
    }
  res.status(200).send();
  } catch (err) {
    next(err);
  }
};

exports.recipeEditGET = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes where recipe_id like ?';
    const result = pool.query(queryString, req.params.id);
    const recipe = result[0];
    res.render('edit-recipe', recipe);
  } catch (err) {
    next(err);
  }
};

exports.recipeEditPOST = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
};

exports.getImagePath = async (req, res, next) => {
  try {
    const queryString = 'SELECT * FROM recipes WHERE recipe_id like ?';
    const result = pool.query(queryString, req.params.id);
  } catch (err) {
    next(err);
  }
}

exports.recipeDeletePOST = async (req, res, next) => {
  try {
    // get image path in 1st query and then do another query to delete

    console.log(result);
    res.json({'todo': 'todo'});
  } catch (err) {
    next(err);
  }
};
