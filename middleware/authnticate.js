const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const user = req.cookies.user;
  if (!user) {
    // res.baseUrl = req.originalUrl;
    // console.log(res.baseUrl, "ggg");
    res.redirect("/login?fromUrl=" + req.originalUrl);
    return;
  }

  const user_ = jwt.verify(user, process.env.SECRET);

  req.user = user_;

  next();
};
