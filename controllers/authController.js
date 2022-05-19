//Authentication İşlemleri burada yapılacak

const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create User
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// Giriş Kontrolü
exports.loginUser =  (req, res) => {
  try {
    const {email, password} = req.body; // mail ve passw body'den gelen mail ve passw'e eşit olacak
    
     User.findOne({email}, (err, user) => {// vt'nındaki maili bodyden gelen mail olanı bulacak. callback ile user yoksa err varsa user'ı donderecek
      if(user){ // kullanıcı varsa şifre kontrolu yap
        bcrypt.compare(password, user.password, (err, same) => {// body'den gelen passw ile vt'da ki passw compare et
          if(same){ // aynıysa 
            // User Session
            req.session.userID = user._id; // hangi kullnıcı giriş yaptıgını belirlemek için her kullanıcıya ozel olan id bilgisini kullanarak session da bir userID olusturyoruz
            
            res.status(200).redirect('/users/dashboard');
          }
        }); // body'den gelen passw ile vt'nıdaki user.passw karşılaştır
      }
    }); 
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

//Çıkış İşlemi
exports.logoutUser = (req, res) => {
  req.session.destroy(()=>{ // destrol metodu oturumu sonlandırır
    res.redirect('/');
  })
}

// Dashboard template'tini render et
exports.getDashboardPage = async (req, res) => { 
  const user = await User.findOne({_id: req.session.userID}) // giriş yapan kullanıcıyı yakalasın
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user // kullanıcı bilgilerini dashboard template'ine gondersin
  });
};