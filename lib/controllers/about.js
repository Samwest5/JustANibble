// stuff here, later

exports.aboutGET = async (req, res, next) => {
  try {
    res.render('about');
  } catch (err) {
    next(err);
  }
};