// courseController fonksiyonunu calıstıracak route'u burada ollusturuyoruz
const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Create Course--yeni bir kurs olusturmak için forum doldurdugumuz için yapmamız gereken post request
router.route('/').post(categoryController.createCategory); //http://localhost:3000/categories -->app.js den gelen

router.route('/:id').delete(categoryController.deleteCategory); 



module.exports = router;
