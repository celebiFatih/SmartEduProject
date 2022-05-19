// bir kullanıcı varsa o kullanıcının register ve login gibi sayfalara ulaşmasını yonlendireceğiz

module.exports = (req, res, next) => {
  if (req.session.userID) return res.redirect('/');
  next();
};
