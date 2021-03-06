const whereBlock = {
  "keyword":        "recipe_name LIKE ?",
  "difficulty":     "difficulty LIKE ?",
  "is_vegan":       "is_vegan = ?",
  "is_vegetarian":  "is_vegetarian = ?",
  "is_dairy_free":  "is_dairy_free = ?",
  "is_gluten_free": "is_gluten_free = ?",
  "is_favorite":    "is_favorite = ?"
}

const createCondition = async (whereValue, whereName) => {
  if (typeof whereValue == "string" && whereValue.length == 0) {
    return "(1 = 1)";
  }
  else {
    const block = whereBlock[whereName];
    return "(" + block + ")"; 
  }
}

const loadFilters = async (whereParameters, whereNames) => {
  let filters = [];
  whereNames.forEach(whereName => {
    filters.push(whereParameters[whereName]);
  })
  return filters;
}

exports.queryBuilder = async (req) => {
  let queryString = "SELECT * FROM recipes WHERE "
  let filters = [];
  let whereParameters = {};
  if (req.body.filterKeyword) {
    whereParameters['keyword'] = '%' + req.body.filterKeyword + '%';
  }
  if (req.body.filterDifficulty) {
    whereParameters['difficulty'] = req.body.filterDifficulty;
  }
  if (req.body.tags) {
    if (req.body.tags.includes('isVegan')) {
      whereParameters['is_vegan'] = true;
    }
    if (req.body.tags.includes('isVegetarian')) {
      whereParameters['is_vegetarian'] = true;
    }
    if (req.body.tags.includes('isDairyFree')) {
      whereParameters['is_dairy_free'] = true;
    }
    if (req.body.tags.includes('isGlutenFree')) {
      whereParameters['is_gluten_free'] = true;
    }
  }
  const sort_mode = req.body.sortTime;

  const whereNames = Object.keys(whereParameters);
  let whereName;
  for (let i = 0; i < whereNames.length; i++) {
    whereName = whereNames[i];
    queryString += await createCondition(whereParameters[whereName], whereName)
    if (i != whereNames.length -1) {
      queryString += " AND ";
    }
  }
  if (whereNames.length == 0) {
    queryString += "(1 = 1)"
  }


  if (sort_mode == "asc") {
    queryString += " ORDER BY overall_time ASC";
  }
  else if (sort_mode == "desc") {
    queryString += " ORDER BY overall_time DESC";
  }

  queryString += ";";

  filters = await loadFilters(whereParameters, whereNames);
  return { queryString, filters };
};

exports.postBuilder = async (req, isEdit) => {
  let post = {};
  if (!isEdit) {
    post.image_path = req.body.image_path;
    post.author_id = req.identity.user_id;
  }
  post.recipe_name = req.body.recipeName;
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
    else {
      post.is_favorite = false;
    }
  }
  post.recipe_text = JSON.stringify({
                        'ingredients': req.body.ingredients.replace(/(\r\n|\n|\r)/gm," ").split( /\s*(?:;|$)\s*/),
                        'steps': req.body.steps.replace(/(\r\n|\n|\r)/gm," ").split( /\s*(?:;|$)\s*/)
                      });
  return post;
}