// stuff here, later

exports.aboutGET = async (req, res, next) => {
  try {
    res.render('about', {title : 'About Us'});
  } catch (err) {
    next(err);
  }
};