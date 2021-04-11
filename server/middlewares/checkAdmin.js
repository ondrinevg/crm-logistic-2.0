const checkAdmin = (req, res, next) => {
  if (req.user.role === 'Admin') {
    return next();
  }
  return res.sendStatus(401);
};

module.exports = {
  checkAdmin,
};
