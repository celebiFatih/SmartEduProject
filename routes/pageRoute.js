//page controller'la ilgili fonk yonlendirmesini burada yapıyoruz.
const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage) // '/' sayfasına get isteği geldiğinde controller'a git getIndexPage'i çalıştır
router.route('/about').get(pageController.getAboutPage)

module.exports = router;