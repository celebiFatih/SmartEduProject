//Authentication İşlemleri burada yapılacak

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

// Create User
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    // console.log(errors);
    // console.log(errors.array()[0].msg); // routt'ta olusturulan hata mesajıonı yakaladık
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
  }
};

// Giriş Kontrolü
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // mail ve passw body'den gelen mail ve passw'e eşit olacak
    // Hem await hem callback kullandığımızda mongo yeni sürümünde hata veriyor. await ile userı aldıktan sonra diğer işlemleri yapabiliriz
    const user = await User.findOne({ email });
      // vt'nındaki maili bodyden gelen mail olanı bulacak. callback ile user yoksa err varsa user'ı donderecek
      if (user) {
        // kullanıcı varsa şifre kontrolu yap
        bcrypt.compare(password, user.password, (err, same) => {
          // body'den gelen passw ile vt'da ki passw compare et

          if (same) {
            //passwordler birbiri ile uyusuyorsa

            // User Session
            req.session.userID = user._id; // hangi kullnıcı giriş yaptıgını belirlemek için her kullanıcıya ozel olan id bilgisini kullanarak session da bir userID olusturyoruz
            res.status(200).redirect('/users/dashboard');
          } else {
            req.flash('error', 'Your password is not correct');
            res.status(400).redirect('/login');
          }
        }); // body'den gelen passw ile vt'nıdaki user.passw karşılaştır
      }else{
          req.flash('error', 'User is not exist');
            res.status(400).redirect('/login');
      }
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

//Çıkış İşlemi
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    // destrol metodu oturumu sonlandırır
    res.redirect('/');
  });
};

// Dashboard template'ini render et
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  ); // giriş yapan kullanıcıyı yakalasın // user üzerinden içinde referansı olan courses modelinden kursa erişebilmek için populate
  const categories = await Category.find(); // tum kategorileri alıp dashboard'a gonderiyoruz
  // dashboard'a kullanıcı tarafından olusturulan  kursları gonderiyoruz
  const courses = await Course.find({ user: req.session.userID }); // kursların içindeki user id ile sessiondaki userid'si ortusenler. yani o an giriş yapmıs olan kullanıclar tarafıondan olusturulan kurslar /rolu öğretmen olan kullnılar
  const users = await User.find();
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user, // kullanıcı bilgilerini dashboard template'ine gondersin
    categories,
    courses,
    users
  });
};


// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    // const user = 
    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({user: req.params.id}) // kaldırılan kullanıcıya ait olan kursları da kaldır
    
    // req.flash("error", `${user.name} user has been removed successfully`);
    
    // cevap
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};