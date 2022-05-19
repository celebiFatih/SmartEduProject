const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Create Course--yeni bir kurs olusturmak için forum doldurdugumuz için yapmamız gereken post request
router.route('/signup').post(authController.createUser); //http://localhost:3000/users/signup -->app.js den gelen
router.route('/login').post(authController.loginUser); // /users tan sonra login oldugu zaman http://localhost:3000/users/login // login.ejs deki form action alanı da users/login olmalı
router.route('/logout').get(authController.logoutUser); // 
router.route('/dashboard').get(authController.getDashboardPage); //http://localhost:3000/users/dashboard

module.exports = router;