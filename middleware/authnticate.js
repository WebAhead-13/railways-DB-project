const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const user = req.cookies.user;

  if (!user) {
    res.redirect("/login");
    return;
  }

  const user_ = jwt.verify(user, process.env.SECRET);

  req.user = user_;

  next();
};
