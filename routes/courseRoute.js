// courseController fonksiyonunu calıstıracak route'u burada ollusturuyoruz
const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

// Create Course--yeni bir kurs olusturmak için forum doldurdugumuz için yapmamız gereken post request
router.route('/').post(courseController.createCourse); //http://localhost:3000/courses -->app.js den gelen

// Kursları sıralamak için gerekli olan route
router.route('/').get(courseController.getAllCourses);

// tekil kurs yonlendirmesi
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
