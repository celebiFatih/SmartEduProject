const mongoose = require('mongoose');
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
});

// şablonu modele donusturme
const Course = mongoose.mongoose.model('Course', CourseSchema);
module.exports = Course;
