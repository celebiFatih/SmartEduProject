// burada yapacağımız ilk işlem yeni bir kurs olusturmak için gerekli fonksiyonu yaz
const Course = require('../models/Course'); // kurs olusturmak için model dosyamızı çağırıyoruz

// Create Course
exports.createCourse = async (req, res) => {
  //kurs olusturma sayfası henuz hazır olmadığı için burada once onun simulasyonunu yapacağız
  // aldığımız cevap. henuz template'e render etmiyoruz. onun yerine json dosyası olarak yazdıyoruz
  try {
    const course = await Course.create(req.body); // req.body kursu doldurmak için gerekli olan formdan gelecek bilgiler
    res.status(201).json({
      status: 'success',
      course,
    }); // yeni olusturma için 201 kodu
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
/* bu işlemi soyle dusunmeliyiz: biz backend'de calısıypruz ve frontend henuz hazır değil. ancak backendde yaparkende
    bizde bir şekilde yeni bir kurs olusturma isteği gelmiş giib davranmamız lazım. bunun için postman yazılımından faydalanacağız.
*/

// Kursları Sıralama
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // tüm kursları alsın
    // cevap
    res.status(200).render('courses', {
      // '/courses' i render et
      courses,
      page_name: 'courses', //courses linkinişn aktif olmasını sağlayacak
    }); // yeni olusturma için 201 kodu
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// Tekil Kursu Getirme
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug}); //slug'ına göre bul
    // cevap
    res.status(200).render('course', { // course template' i içinde render et
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
