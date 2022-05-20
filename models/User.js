const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// olusturulacak kurs dokumanlarının nasıl olacağını schema şablonu olusturarak belirliyoruz
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"], // string veritipinin alacağı değerleri tanımladık. kullanıcı öğrenci, öğretmen ya da admin olabilir
    default: "student" // varsayılan oalrak öğrenci olacak
  },
  courses: [{ // kullanıcının almıs oldugu kurslar için Course modeli ile ilişki
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

// Kullanıcıdan alınan şifreyi vt' ye kaydedilmeden(belge olusturulmadan) once hash olarak kaydediyoruz
UserSchema.pre('save', function (next) {
  if(!this.isModified('password')) return next();
  const user = this; // this hangi kullanıcı giriş işlemi yapıyorsa o kullnıcı
  bcrypt.hash(user.password, 10, (error, hash) => { // 10 şifrelemenin duzeyini temsil ediyor
    user.password = hash;
    next();
  });
});

// şablonu modele donusturme
const User = mongoose.model('User', UserSchema);

module.exports = User;
