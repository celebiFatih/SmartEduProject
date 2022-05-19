// kullanıcı yetkisi olmayan bir sayfaya ulaşmaya calıstıgı zaman onu redirect edecek
const User = require('../models/User');

module.exports = (req, res, next) => { // anaonim fonk olarak export ediyoruz
  // once kullanıcının olup olmadıgını öğreniyoruz
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    next();
  });
};
