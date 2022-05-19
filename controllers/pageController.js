// '/index' template'ini render et'
exports.getIndexPage = (req, res) => { 
  res.status(200).render('index', {
    page_name: 'index', //template engine page_name isimli değişken gonderiyoruz. sayfa aktif olanı gosterilmesinde kullanamk için
  });
};

// '/about' template'ini render et'
exports.getAboutPage = (req, res) => { 
  res.status(200).render('about', {
    page_name: 'about',
  });
};

// '/register' template'ini render et'
exports.getRegisterPage = (req, res) => { 
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => { 
  res.status(200).render('login', {
    page_name: 'login',
  });
};