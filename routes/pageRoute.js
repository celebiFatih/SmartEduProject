//page controller'la ilgili fonk yonlendirmesini burada yapıyoruz.
const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage) // '/' sayfasına get isteği geldiğinde controller'a git getIndexPage'i çalıştır
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage) // bu herhangi bir kullanıcının ulaşabileceği bir sayfa oldugu için bu sayfada ve pageController sayfasında gerçekleştirdik. kayıt işlemi gerçekleştikten sonraki işlemleri ayrı bir controller da yapacağız
router.route('/login').get(redirectMiddleware, pageController.getLoginPage); // login sayfasını getir
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail); // formdaki bilgileri gonderirken post

module.exports = router;