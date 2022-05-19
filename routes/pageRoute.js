//page controller'la ilgili fonk yonlendirmesini burada yapıyoruz.
const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage) // '/' sayfasına get isteği geldiğinde controller'a git getIndexPage'i çalıştır
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(pageController.getRegisterPage) // bu herhangi bir kullanıcının ulaşabileceği bir sayfa oldugu için bu sayfada ve pageController sayfasında gerçekleştirdik. kayıt işlemi gerçekleştikten sonraki işlemleri ayrı bir controller da yapacağız
router.route('/login').get(pageController.getLoginPage); // login sayfasını getir

module.exports = router;