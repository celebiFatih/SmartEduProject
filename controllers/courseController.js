// burada yapacağımız ilk işlem yeni bir kurs olusturmak için gerekli fonksiyonu yaz
const Course = require('../models/Course'); // kurs olusturmak için model dosyamızı çağırıyoruz
const Category = require('../models/Category'); // courses sayfasına aynı zamanda kategorileri de gondememiz gerek

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
    // kursları kategorilerine gore filtreleyip sıralama
    const categorySlug = req.query.categories; //parametreden gelen kategoriyi bulduk. //http://localhost:3000/courses?categories=programming
    const category = await Category.findOne({ slug: categorySlug }); // await olmasını beklemeden aşağı inmesin kod
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter); // tüm kursları kategorisine göre alsın
    const categories = await Category.find(); // tüm kategorileri alsın

    // cevap
    res.status(200).render('courses', {
      // '/courses' i render et
      courses,
      categories,
      page_name: 'courses', //courses linkinin aktif olmasını sağlayacak
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
    const course = await Course.findOne({ slug: req.params.slug }); //slug'ına göre bul
    // cevap
    res.status(200).render('course', {
      // course template' i içinde render et
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
