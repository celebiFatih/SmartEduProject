// courseController fonksiyonunu calıstıracak route'u burada ollusturuyoruz
const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Create Course--yeni bir kurs olusturmak için forum doldurdugumuz için yapmamız gereken post request
router.route('/').post(roleMiddleware(["teacher","admin"]), courseController.createCourse); //http://localhost:3000/courses -->app.js den gelen
//burada mw'e parametre olarak teacher ve admin gonderdik. admin yada öğretmense kurs oluşturabilecek

// Kursları sıralamak için gerekli olan route
router.route('/').get(courseController.getAllCourses);

// tekil kurs yonlendirmesi
router.route('/:slug').get(courseController.getCourse);

// user'a eklenecek kursu yonlendirme
router.route('/enroll').post(courseController.enrollCourse);


module.exports = router;
