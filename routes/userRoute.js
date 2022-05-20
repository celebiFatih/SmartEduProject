const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User')

const router = express.Router();

// Create Course--yeni bir kurs olusturmak için forum doldurdugumuz için yapmamız gereken post request
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'), // body'den gelen name'e bakacak        
        
        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter a Password')
    ],
    authController.createUser); //http://localhost:3000/users/signup -->app.js den gelen
router.route('/login').post(authController.loginUser); // /users tan sonra login oldugu zaman http://localhost:3000/users/login // login.ejs deki form action alanı da users/login olmalı
router.route('/logout').get(authController.logoutUser); // 
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //once authMiddleware'i kontrol et //http://localhost:3000/users/dashboard


module.exports = router;