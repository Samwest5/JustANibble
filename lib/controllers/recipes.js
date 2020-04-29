// stuff here later
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

exports.recipeSingleGET = async (req, res, next) => {
  try {
    res.render('recipe');
  } catch (err) {
    next(err);
  }
};

exports.recipeEditGET = async (req, res, next) => {
  try {
    res.render('edit-recipe');
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
    res.render('blah');
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
