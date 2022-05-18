const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db', {}).then(() => {
  //promise nesnesini yakalıyoruz.
  console.log('DB Connected Succesful');
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//ROUTES
app.use('/', pageRoute); // '/' isteği geldiği zaman pageRoute' u kullan. tüm gelen istekler pageRoute'a yönlendiriliyor
// burada artık sadece index sayfasını route ediyoruz ve pageRoute sayfasına yonlendiriyoruz.
//artık diğer sayfaların yonlendirilmesi de pageRoute uzerinden devam edilecek.
// yapılacak olan yonlendirmeleri buyuk projelerde tek bir dosyada koydugumuzda işlerin karışmaması için
// kullanıcıları kursların yonlendirmelerini de ayrı bir dosyada gerçekleştireceğiz
app.use('/courses', courseRoute); // '/courses' isteği geldiği zaman courseRoute' u kullan.

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
