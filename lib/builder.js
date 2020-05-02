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

const queryBuilder = async (req) => {
  let queryString = "SELECT * FROM recipes WHERE "
  let filters = [];
  const whereParameters = {
    "keyword":        req.body.keyword,
    "difficulty":     req.body.difficulty,
    "is_vegan":       req.body.is_vegan,
    "is_vegetarian":  req.body.is_vegetarian,
    "is_dairy_free":  req.body.is_dairy_free,
    "is_gluten_free": req.body.is_gluten_free,
    "is_favorite":    req.body.is_favorite
  }
  const is_time_sort = req.body.is_time_sort;
  const sort_mode = req.body.sort_mode;

  const whereNames = Object.keys(whereParameters);
  let whereName;
  for (let i = 0; i < whereNames.length; i++) {
    whereName = whereNames[i];
    queryString += await createCondition(whereParameters[whereName], whereName)
    if (i != whereNames.length -1) {
      queryString += " AND ";
    }
  }

  if (is_time_sort) {
    if (sort_mode == "asc") {
      queryString += " ORDER BY overall_time ASC";
    }
    else if (sort_mode == "desc") {
      queryString += " ORDER BY overall_time DESC";
    }
  }

  queryString += ";";

  filters = await loadFilters(whereParameters, whereNames);
  return { queryString, filters };
};

module.exports = queryBuilder;