const express = require('express');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index',{
      page_name: "index" //template engine page_name isimli değişken gonderiyoruz. sayfa aktif olanı gosterilmesinde kullanamk için
  });
});
app.get('/about', (req, res) => {
  res.status(200).render('about',{
    page_name: "about"
});
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
