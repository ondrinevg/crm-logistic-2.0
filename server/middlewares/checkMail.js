const checkMail = (req, res, next) => {
  const userID = req.user.id;
  return next();
};

module.exports = {
  checkMail,
};