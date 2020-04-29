// stuff here

exports.drinksGET = async (req, res, next) => {
  try {
    res.render('drinks');
  } catch (err) {
    next(err);
  }
};