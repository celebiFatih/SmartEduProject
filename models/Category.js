const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

// olusturulacak kurs dokumanlarının nasıl olacağını schema şablonu olusturarak belirliyoruz
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true, // aynı adda kurs olmasın
    required: true, // zorunlu olarak doldurulması gereken bir alan olacak
  },
  slug: {
    type: String,
    unique: true,
  },
});

// Slugify Olusturma
CategorySchema.pre('validate', function (next) {
  // arrow functionların this'i olmadıgından normal func kullandık. pre() ile vt'na kaydetmeden once slug' ın olusturulmasını sağlıyoruz
  this.slug = slugify(this.name, {
    // this.name'i slug et // modelin ismini slug' a cevirecek
    lower: true,
    strict: true, // : gibi farklı karakterkleri yoksayar
  });
  next(); // bir sonraki mw'e gecmesi için
});

// şablonu modele donusturme
const Category = mongoose.mongoose.model('Category', CategorySchema);

module.exports = Category;
