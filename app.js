const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  //promise nesnesini yakalıyoruz.
  console.log('DB Connected Succesful');
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// Global Variable
global.userIN = null;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat', //  oturum tanımlama bilgisini imzalamak için kullanılan sırdır.
  resave: false, // İstek sırasında oturum hiç değiştirilmemiş olsa bile, oturumu oturum deposuna geri kaydedilmeye zorlar.
  saveUninitialized: true, //bir oturumu kaydedilmeye zorlar
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
}));
app.use(flash());
app.use((req,res,next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute); // '/' isteği geldiği zaman pageRoute' u kullan. tüm gelen istekler pageRoute'a yönlendiriliyor
// burada artık sadece index sayfasını route ediyoruz ve pageRoute sayfasına yonlendiriyoruz.
//artık diğer sayfaların yonlendirilmesi de pageRoute uzerinden devam edilecek.
// yapılacak olan yonlendirmeleri buyuk projelerde tek bir dosyada koydugumuzda işlerin karışmaması için
// kullanıcıları kursların yonlendirmelerini de ayrı bir dosyada gerçekleştireceğiz
app.use('/courses', courseRoute); // '/courses' isteği geldiği zaman courseRoute' u kullan.
app.use('/categories', categoryRoute); // '/categories' isteği geldiği zaman categoryRoute' u kullan.
app.use('/users', userRoute); // '/users' isteği geldiği zaman userRoute' u kullan.


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
