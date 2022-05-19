const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

// olusturulacak kurs dokumanlarının nasıl olacağını schema şablonu olusturarak belirliyoruz
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true, // aynı adda kurs olmasın
    required: true, // zorunlu olarak doldurulması gereken bir alan olacak
  },
  description: {
    type: String,
    required: true,
    trim: true, // başında ve sonundaki boslukları kaldır
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: { // kurslarla kategoriler arasındaki ilişkiyi tanımlıyoruz. Kursları olusturken aynı zamanda kategorilerini de secebileceğiz
    type: mongoose.Schema.Types.ObjectId, // bu kategorileri kendimiz belirlemek yerine var olan kategori verilenden cekiyoruz.
    ref: 'Category' // referans vermek istedeğimiz modelin ismini tanımlıyoruz
  },
  user: { // kursu olusturan aöğretmen bilgilerini alabileceğiz
    type: mongoose.Schema.Types.ObjectId, // kurslarla kullanıcılar arasındaki ilişkiyi tanımlıyoruz
    ref: 'User'
  }
});

// Slugify Olusturma
CourseSchema.pre('validate', function (next) {
  // arrow functionların this'i olmadıgından normal func kullandık. pre() ile vt'na kaydetmeden once slug' ın olusturulmasını sağlıyoruz
  this.slug = slugify(this.name, {
    // this.name'i slug et // modelin ismini slug' a cevirecek
    lower: true,
    strict: true, // : gibi farklı karakterkleri yoksayar
  });
  next(); // bir sonraki mw'e gecmesi için
});

// şablonu modele donusturme
const Course = mongoose.mongoose.model('Course', CourseSchema);

module.exports = Course;
